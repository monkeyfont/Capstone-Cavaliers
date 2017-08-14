from game import *

# just some really basic manual testing. Need to automate with python testing... 


game = GameBoard()

print("should be atlanta: " + game.cities["ATLANTA"].name)

print("Should be 1: " + str(game.cities["ATLANTA"].getResearchStation()))

print("should be 0: " + str(game.cities["SYDNEY"].blue))


print("PLAYER CARD: " + game.playerDeck[10].name)


print("INFECTION CARD: " + game.infectionDeck[10].name)


# movement tests
#     "NEWYORK": {"colour": "blue", "connections": ['MONTREAL','WASHINGTON','MADRID','LONDON']},
#    "ATLANTA": {"colour": "blue", "connections": ['CHICAGO','MIAMI','WASHINGTON']},
#    "WASHINGTON": {"colour": "blue", "connections": ['MONTREAL','ATLANTA','MIAMI','NEWYORK']},

print(game.movePlayer(1, "SYDNEY"))

print(game.movePlayer(1, "NEWYORK"))

print(game.movePlayer(1, "WASHINGTON"))

print(game.movePlayer(1, "NEWYORK"))

print(game.movePlayer(1, "WASHINGTON"))

print(game.movePlayer(1, "some random city...."))
