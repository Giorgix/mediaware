# TODO
'''
   * save similar items dataset in the database
   * update that dataset frecuently
'''

import zerorpc
import recommendations as rec


print rec


class Recommendations(object):
    def calcSimilarItems(self, data):
        return rec.calculateSimilarItems(data)

    def getRecommendedItems(self, data, itemMatch, user):
        return rec.getRecommendedItems(data, itemMatch, user)

    def similarity(self, data, similarity=rec.similarity_pearson):
        return similarity(data, 'Claudia Puig', 'Lisa Rose')

    def hello(self, name):
        return "Hello, %s" % name

s = zerorpc.Server(Recommendations())
s.bind("tcp://0.0.0.0:4242")
s.run()
