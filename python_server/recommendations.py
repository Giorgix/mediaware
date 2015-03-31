## Programming Collective Intelligence approach ##

from math import sqrt


# A dictionary of movie critics and their ratings of a small
# set of movies
critics = {
    'Lisa Rose': {
        'Lady in the Water': 2.5,
        'Snakes on a Plane': 3.5,
        'Just My Luck': 3.0,
        'Superman Returns': 3.5,
        'You, Me and Dupree': 2.5,
        'The Night Listener': 3.0},
    'Gene Seymour': {
        'Lady in the Water': 3.0,
        'Snakes on a Plane': 3.5,
        'Just My Luck': 1.5,
        'Superman Returns': 5.0,
        'The Night Listener': 3.0,
        'You, Me and Dupree': 3.5},
    'Michael Phillips': {
        'Lady in the Water': 2.5,
        'Snakes on a Plane': 3.0,
        'Superman Returns': 3.5,
        'The Night Listener': 4.0},
    'Claudia Puig': {
        'Snakes on a Plane': 3.5,
        'Just My Luck': 3.0,
        'The Night Listener': 4.5,
        'Superman Returns': 4.0,
        'You, Me and Dupree': 2.5},
    'Mick LaSalle': {
        'Lady in the Water': 3.0,
        'Snakes on a Plane': 4.0,
        'Just My Luck': 2.0,
        'Superman Returns': 3.0,
        'The Night Listener': 3.0,
        'You, Me and Dupree': 2.0},
    'Jack Matthews': {
        'Lady in the Water': 3.0,
        'Snakes on a Plane': 4.0,
        'The Night Listener': 3.0,
        'Superman Returns': 5.0,
        'You, Me and Dupree': 3.5},
    'Toby': {
        'Snakes on a Plane': 4.5,
        'You, Me and Dupree': 1.0,
        'Superman Returns': 4.0}}


# Returns a distance-based similarity score for person1 and person2
def similarity_distance(data, person1, person2):
    # Get the list of shared_items
    shared_items = {}
    sum_of_squares = 0
    for item in data[person1]:
        if item in data[person2]:
            shared_items[item] = 1

    # if they have no ratingsin common, return 0
    if len(shared_items) == 0:
        return 0

    # Add up the squares of all the differences
    for item in data[person1]:
        if item in data[person2]:
            sum_of_squares += pow(data[person1][item] - data[person2][item], 2)
    return 1 / (1 + sum_of_squares)


def similarity_pearson(data, person1, person2):
    # Get the list of mutually rated items
    shared_items = {}
    for item in data[person1]:
        if item in data[person2]:
            shared_items[item] = 1

    # Find the number of elements
    n = len(shared_items)

    # if there are no ratings in common, return 0
    if n == 0:
        return 0

    sum1 = 0
    sum2 = 0
    sum1Sq = 0
    sum2Sq = 0
    pSum = 0
    for item in shared_items:
        # Add up all the preferences
        sum1 += data[person1][item]
        sum2 += data[person2][item]
        # Sum up the squares
        sum1Sq += pow(data[person1][item], 2)
        sum2Sq += pow(data[person2][item], 2)
        # Sum up the products
        pSum += data[person1][item] * data[person2][item]

    # Calculate Pearson Score
    numerator = pSum - (sum1 * sum2 / n)
    denominator = sqrt((sum1Sq - pow(sum1, 2) / n) *
                       (sum2Sq - pow(sum2, 2) / n))
    if denominator == 0:
        return 0
    result = numerator / denominator
    return result


# Tanimoto score is used to compare vectors with binary attributes
# Ex. You have U users and T topics, each user either follows(1)
# or not (0) a topic, then you have T vectors of 1s and 0s representing
# each users follow preference of that topic. You can compare any two vectors
# wich would give a number between 0 and 1 representing how often users follow
# both topics and hence how "similar" they are.
def similarity_tanimoto(vec1, vec2):
    N = len(vec1)

    assert N == len(vec2)

    v1v2, v1v1, v2v2 = 0., 0., 0.
    for i in xrange(N):
        v1v2 += vec1[i] * vec2[i]
        v1v1 += vec1[i] * vec1[i]
        v2v2 += vec2[i] * vec2[i]

    return v1v2 / (v1v1 + v2v2 - v1v2)


##############################################

# USER-BASED COLLABORATIVE FILTERING

##############################################

# Returns the best matches for person from the data dictionary.
# Number of results and similarity function are optional params.
def topMatches(data, person, n=5, similarity=similarity_pearson):
    scores = []
    for other in data:
        if other != person:
            # Append the tuple with (value, other) to the scores list
            scores.append((similarity(data, person, other), other))

    # Sort the list so the highest scores appear at the top
    scores.sort()
    scores.reverse()
    return scores[0:n]


# Gets recommendations for a person by using a weighted average
# of every other user's rankings
def getRecommendations(data, person, similarity=similarity_pearson):
    totals = {}
    similarity_sum = {}
    for other in data:
        # don't compare me to myself
        if other == person:
            continue
        sim = similarity(data, person, other)

        # igonre scores of zero or lower
        if sim <= 0:
            continue
        for item in data[other]:

            # only score movbies I haven't seen yet
            if item not in data[person] or data[person][item] == 0:
                # Similarity * Score
                totals.setdefault(item, 0)
                totals[item] += data[other][item] * sim
                # Sum of similarities
                similarity_sum.setdefault(item, 0)
                similarity_sum[item] += sim
    # Create the normalized list
    rankings = [(total / similarity_sum[item], item)
                for item, total in totals.items()]

    # Return the sorted list
    rankings.sort()
    rankings.reverse()
    return rankings


def transformData(data):
    result = {}
    for person in data:
        for item in data[person]:
            result.setdefault(item, {})

            # Flip item and person
            result[item][person] = data[person][item]
    return result

##################################################

# ITEM-BASED COLLABORATIVE FILTERING

##################################################




def calculateSimilarItems(data, n=10):
    # Create a dictionary of items showing which
    # other items they are most similar to
    result = {}

    # Invert the preference matrix to be item-centric
    itemData = transformData(data)
    c = 0
    for item in itemData:
        # Status updates for large datasets
        c += 1
        if c % 100 == 0:
            print "%d / %d" % (c, len(itemData))
        # Find the most similar items to this one
        scores = topMatches(itemData, item, n=n,
                            similarity=similarity_distance)
        result[item] = scores
    return result


def getRecommendedItems(data, itemMatch, user):
    userRatings = data[user]
    scores = {}
    totalSim = {}

    # Loop over items rated by this user
    for (item, rating) in userRatings.items():

        # Loop over items similar to this one
        for (similarity, item2) in itemMatch[item]:

            # Ignore if this user has already rated this item
            if item2 in userRatings:
                continue

            # Weight sum of ratings times similarity
            scores.setdefault(item2, 0)
            scores[item2] += similarity * rating

            # Sum of all the similarities
            totalSim.setdefault(item2, 0)
            totalSim[item2] += similarity

    # Divide each total score by total weighting to get an average
    rankings = [(score / totalSim[item], item) for item, score in scores.items()]

    # Return the rankings from highest to lowest
    rankings.sort()
    rankings.reverse()
    return rankings


def loadMovieLens(path='data/MovieLens'):

    # Get movie titles
    movies = {}
    for line in open(path + '/u.item'):
        (id, title) = line.split('|')[0:2]
        movies[id] = title

    # Load data
    data = {}
    for line in open(path + '/u.data'):
        (user, movieid, rating, ts) = line.split('\t')
        data.setdefault(user, {})
        data[user][movies[movieid]] = float(rating)
    return data
