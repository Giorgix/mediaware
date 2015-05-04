# TODO
'''
   * save similar items dataset in the database
   * update that dataset frecuently
'''

import zerorpc
import recommendations as rec
from pymongo import MongoClient

db = MongoClient('mongodb://localhost:27017/').recommendations


def getCritics(user=''):
    criticsList = []
    if user != '':
        critic = db.critics.find_one({"userId": user})
        criticsList.append(critic)
        return criticsList
    critics = db.critics.find()
    for critic in critics:
        criticsList.append(critic)
    return criticsList


def getSimilarMovies():
    similarMovies = db.similarmovies.find()
    similarMoviesList = []
    for movie in similarMovies:
        similarMoviesList.append(movie)
    return similarMoviesList


class Recommendations(object):
    # here it should get the critics when its called
    def calcSimilarItems(self):
        critics = getCritics()
        return rec.calculateSimilarItems(critics)

    def getRecommendedItems(self, user):
        critics = getCritics(user)
        similarMovies = getSimilarMovies()
        return rec.getRecommendedItems(critics, similarMovies, user)

    def similarity(self, data, similarity=rec.similarity_pearson):
        return similarity(data, 'Claudia Puig', 'Lisa Rose')

    def hello(self, name):
        return "Hello, %s" % name

s = zerorpc.Server(Recommendations())
s.bind("tcp://0.0.0.0:4242")
s.run()
