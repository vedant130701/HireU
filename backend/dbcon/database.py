from motor.motor_asyncio import AsyncIOMotorClient

MONGO_URL = "mongodb+srv://ananyaasthana13:toBEQvQbSj7lX9uG@hireu.nqo14.mongodb.net/?retryWrites=true&w=majority&appName=HireU"
client = AsyncIOMotorClient(MONGO_URL)
db = client.HireU
employer_registration_collection = db.Employer_info
