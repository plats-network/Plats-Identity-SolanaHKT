import os
import json
import traceback

import requests

SOL_DECIMALS = 9
BACKEND_URL = os.getenv("BACKEND_URL")


def get_tx_hashes(wallet_addr: str, from_tx_hash: str = "", limit=100) -> list:
    url = "https://explorer-api.devnet.solana.com/"
    paging_config = {"before": from_tx_hash, "limit": limit} if from_tx_hash else {"limit": limit}
    payload = json.dumps({
        "method": "getSignaturesForAddress",
        "jsonrpc": "2.0",
        "params": [wallet_addr, paging_config],
        "id": "ee1cf2f6-f9bb-495a-9a37-efcec96872be"
    })
    headers = {'content-type': 'application/json'}
    response = requests.request("POST", url, headers=headers, data=payload)
    if response.status_code != 200:
        return []
    results = response.json().get("result") or []
    return [
        {
            "block_time_stamp": result.get("blockTime"),
            "tx_hash": result.get("signature"),
            "block_number": result.get("slot"),
        } for result in results
    ]


def get_tx_volume(signature: str):
    url = "https://explorer-api.devnet.solana.com/"
    payload = json.dumps({
        "method": "getTransaction",
        "jsonrpc": "2.0",
        "params": [
            signature,
            {
                "encoding": "jsonParsed",
                "commitment": "confirmed",
                "maxSupportedTransactionVersion": 0
            }
        ],
        "id": "2ff85a0f-e423-40bf-9455-bcf4e324ff40"
    })
    headers = {'content-type': 'application/json'}
    response = requests.request("POST", url, headers=headers, data=payload)
    if response.status_code != 200:
        return 0
    pre_balances = response.json().get("result").get("meta").get("preBalances")[0]
    post_balances = response.json().get("result").get("meta").get("postBalances")[0]
    volume = abs(abs(pre_balances) - abs(post_balances))
    return volume * 10 ** (-1 * SOL_DECIMALS)


def sync(wallet_addr: str, from_block: int, to_block: int):
    total_volume = 0
    latest_tx_hash = ""
    is_end = False
    while True:
        tx_hashes = get_tx_hashes(wallet_addr, from_tx_hash=latest_tx_hash)

        if not tx_hashes:
            break

        for tx_hash_obj in tx_hashes:
            block_number = tx_hash_obj.get("block_number")

            if block_number >= to_block:
                continue

            if block_number <= from_block:
                is_end = True
                break

            tx_hash = tx_hash_obj.get("tx_hash")
            volume = get_tx_volume(tx_hash)
            # TODO: sol to usd by timestamp
            total_volume += volume

        if is_end:
            break

        latest_tx_hash = tx_hashes[-1].get("tx_hash")

    # NOTE: we currently convert total volume to USD by using the latest price

    return total_volume


def add_volume(plat_id: str, asset_symbol: str, volume: int) -> None:
    key = f"volume_{asset_symbol}_in_usd"

    # get current volume
    current_volume = 0
    response = requests.get(
        f"{BACKEND_URL}/api/v1/internal/nillion/retrieve",
        headers={
            "accept": "application/json"
        },
        params={
            "plat_id": plat_id,
            "key": key
        }
    )
    if response.status_code == 200:
        response_json = response.json()
        current_volume = response_json.get('data').get('value') or 0
        print("Has current volume: ", current_volume)

    current_volume = float(current_volume)

    # add new volume
    new_volume: float = abs(current_volume) + abs(volume)

    # store new value
    response = requests.post(
        f"{BACKEND_URL}/api/v1/internal/nillion/store",
        headers={
            "accept": "application/json",
            "Content-Type": "application/json"
        },
        json={
            "plat_id": plat_id,
            "key": key,
            "value": f"{new_volume}"
        }
    )
    print(f"added volume {plat_id}: ", response.json())
    return


def set_is_new_user(plat_id: str, is_new_user: bool) -> None:
    is_new_user_str = "true" if is_new_user else "false"
    url = f"{BACKEND_URL}/api/v1/internal/nillion/user?plat_id={plat_id}&is_new_user={is_new_user_str}"
    payload = {}
    headers = {'accept': 'application/json'}
    response = requests.request("POST", url, headers=headers, data=payload)
    print("Set is_new_user: ", response.json())
    return


def update_balance(plat_id: str, wallet_addr: str, price_in_usd: float):
    url = "https://api.devnet.solana.com"
    payload = json.dumps({
        "jsonrpc": "2.0",
        "id": 1,
        "method": "getBalance",
        "params": [wallet_addr]
    })
    headers = {'Content-Type': 'application/json'}
    response = requests.request("POST", url, headers=headers, data=payload)

    balance_sol = response.json().get("result").get("value")
    print("balance_sol: ", balance_sol)
    display_balance_sol: float = balance_sol * 10 ** (-1 * SOL_DECIMALS)
    print("display_balance_sol: ", display_balance_sol)
    balance_usd: float = display_balance_sol * price_in_usd
    print("balance_usd: ", balance_usd)
    # update new balance
    response = requests.post(
        f"{BACKEND_URL}/api/v1/internal/nillion/store",
        headers={
            "accept": "application/json",
            "Content-Type": "application/json"
        },
        json={
            "plat_id": plat_id,
            "key": "balance",
            "value": f"{balance_usd}"
        }
    )
    print(f"update balance {plat_id}: ", response.json())
    return

# def main():
#     plat_id = "odinhoang"
#     my_addr = "H3xebErnGPc5JsFyjaDGYh4MN3rH1VBEzxsWu1bf5ryz"
#     from_block = 325635587
#     to_block = 325684254
#     # get volume
#     volume = sync(wallet_addr=my_addr, from_block=from_block, to_block=to_block)
#     # add volume
#     add_volume(plat_id=plat_id, asset_symbol="SOL", volume=volume)
#     return


# main()

def main(event, context):
    print("Event: ", event)
    print("Context: ", event)
    payload = json.loads(event.get("Records")[0].get("body"))
    plat_id = payload.get("plat_id")
    # call set is_new_user to False
    set_is_new_user(plat_id=plat_id, is_new_user=False)
    try:
        wallet_addr = payload.get("wallet_addr")
        from_block = payload.get("from_block")
        to_block = payload.get("to_block")
        usd_price = payload.get("usd_price")
        usd_price = float(usd_price)
        # get volume
        volume = sync(wallet_addr=wallet_addr, from_block=from_block, to_block=to_block)
        print("volume sol: ", volume)
        volumne_usd = usd_price * volume
        print("volume usd: ", volumne_usd)
        # add volume
        add_volume(plat_id=plat_id, asset_symbol="SOL", volume=volumne_usd)
        # update_balance
        update_balance(plat_id=plat_id, wallet_addr=wallet_addr, price_in_usd=usd_price)

    except Exception:
        traceback.print_exc()
        set_is_new_user(plat_id=plat_id, is_new_user=True)
    return
