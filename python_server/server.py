# TODO
'''
   * save similar items dataset in the database
   * update that dataset frecuently
'''

import zerorpc
import recommendations as rec
from pymongo import MongoClient

db = MongoClient('mongodb://localhost:27017/').recommendations
critics = db.critics.find()
for critic in critics:
    print critic


class Recommendations(object):
    # here it should get the critics when its called
    def calcSimilarItems(self):
        return rec.calculateSimilarItems(critics)

    def getRecommendedItems(self, data, itemMatch, user):
        return rec.getRecommendedItems(data, itemMatch, user)

    def similarity(self, data, similarity=rec.similarity_pearson):
        return similarity(data, 'Claudia Puig', 'Lisa Rose')

    def hello(self, name):
        return "Hello, %s" % name

s = zerorpc.Server(Recommendations())
s.bind("tcp://0.0.0.0:4242")
s.run()
