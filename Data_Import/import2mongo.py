import pymongo
import csv
import json


client = pymongo.MongoClient(
    "Your mongo connection")

files = ["Test task - Mongo - customers.csv",
         "Test task - Mongo - customer_companies.csv"]
names = ["customers", "companies"]

for i in range(len(files)):
    json_data = [json.loads(json.dumps(row))
                 for row in csv.DictReader(open(files[i]))]
    print(json_data)
    db = client.test
    db[names[i]].insert_many(json_data)
client.close()
