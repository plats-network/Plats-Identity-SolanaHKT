from src.models import mUser
import pydash as py_
from .twitter import TwitterService
from src.services import Nillion
from src.services.solana_client import Solana
class UserService(object):
    
    @staticmethod
    def check_register(address: str):
        # filter User in db has address array contains address
        user = mUser.get_item_with({"address": {"$elemMatch": {"$eq": address}}})
        if user:
            return {
                "plat_id": user['plat_id'],
                "address": user['address'],
                "is_new_user": user['is_new_user']
            }
        return None
        
        
    @staticmethod
    def register(plat_id: str, eoa: str, public_key: str):
        # check exist public_key
        exist_user = mUser.get_item_with({"public_key": public_key})
        exist_plat_id = mUser.get_item_with({"plat_id": plat_id})
        if exist_user:
            return None

        if exist_plat_id:
            return None
        
        user = mUser.insert({
            "plat_id": plat_id,
            "address": [eoa],
            "public_key": public_key,
            "is_new_user": True
        })
        return user
        
    @staticmethod
    async def get_user(plat_id: str):
        user = mUser.get_item_with({"plat_id": plat_id})
        # except ObjectId
        except_list = ['_id', 'public_key', 'plat_id', 'address', 'date_created', 'date_updated', 'is_new_user']
        temp_user = py_.clone(user)
        
        if not user:
            return None
        
        # get store_id from solana
        store_balance, store_volume, store_twitter = Solana.get(user.get('public_key'))
        
        # Log all variables
        print(f"store_balance: {store_balance}")
        print(f"store_volume: {store_volume}")
        print(f"store_twitter: {store_twitter}")
        if not store_balance or not store_volume or not store_twitter:
            return {}
        # get data from nillion
        user_info = await Nillion.get_info(plat_id, store_balance, store_volume, store_twitter)
        
        if user_info:
            return user_info
        # if user:
        #     for key in except_list:
        #         temp_user.pop(key, None)
            
        #     for key in temp_user:
        #         value = await Nillion.retrieve(plat_id, key)
        #         user[key] = value
        #     user.pop("_id", None)
        #     return user
        return {}
    
    @staticmethod
    def get_user_by_public_key(public_key: str):
        user = mUser.get_item_with({"public_key": public_key})
        return user
    
    
    @staticmethod
    def update_user(plat_id: str, eoa: str):
        user = mUser.get_item_with({"plat_id": plat_id})
        if not user:
            raise Exception("User not found")
        user['address'].append(eoa)
        mUser.update(user)
    
    @staticmethod
    def update_user_info(plat_id: str, data: dict):
        user = mUser.get_item_with({"plat_id": plat_id})
        if not user:
            raise Exception("User not found")
        mUser.update(user['_id'], data)