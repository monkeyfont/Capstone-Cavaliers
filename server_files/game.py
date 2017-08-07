# temp cities dictionary. id : {name: string, connections : [id], x:int, y:int}
CITIES_TEMPLATE = {
    1:{"connections":[2,3], "name": "city1", "x":100, "y":100},
    2:{"connections":[1,4], "name": "city2", "x":400, "y":400},
    3:{"connections":[1,4], "name": "city3", "x":630, "y":720},
    4:{"connections":[2,3], "name": "city4", "x":802, "y":605}
}

# id : {name, description}
INFECTION_CARDS = {
    1:{"city":"Atlanta", "country":"United States"},
    2:{"city":"London", "country":"United Kingdom"}
}

PLAYER_CARDS = {
    1: {"city": "Atlanta", "country": "United States", "population":"0", "area":"0", "color":"blue"},
    2: {"city": "London", "country": "United Kingdom", "population":"0", "area":"0", "color":"blue"}
}

EVENT_CARDS = {
    1:{"name":"Government Grant", "description":"Add 1 research station to any city ( no city card needed )"},
    2:{"name":"Airlift", "description":"Move any 1 pawn to any city, get permission before moving another player's pawn"}
}

class City:
    """ City class definition """
    def __init__(self, id, name, connections):
        """ init def """
        self.id = id
        self.name = name
        self.blue = 0
        self.black = 0
        self.red = 0
        self.yellow = 0
        self.researchStation = 0
        self.player1 = 0
        self.player2 = 0
        self.player3 = 0
        self.player4 = 0
        self.connections = connections

class Player:
    """ Player class def """
    def __init__(self, id, name = "Player"):
        """ init def """
        self.id = id
        self.name = name
        self.role = 0
        self.hand = []
        self.location = 1
        self.host = 0

class GameBoard:
    """ Game class definition """
    def __init__(self):
        """ init def """
        self.infectionRates = [2,2,2,3,3,4,4] # how many infection cards are drawn at the end of every turn
        self.cities = self.__generateCities() # {id : City}
        self.infectionDeck = []
        self.infectionDiscarded = []
        self.playerDeck = []
        self.playerDiscarded = []
        self.researchStations = [1] # city ids where research stations are. Atlanta always has a research station.
        self.player1 = Player(1)
        self.player2 = Player(2)
        self.player3 = Player(3)
        self.player4 = Player(4)
        self.blueUsed = 0 # disease cubes used
        self.redUsed = 0
        self.yellowUsed = 0
        self.blackUsed = 0
        self.yellowCure = 0
        self.redCure = 0 # 0 = undiscovered, 1 = cured, 2 = eradicated
        self.blueCure = 0
        self.blackCure = 0
        self.outBreakLevel = 0
        self.infectionLevel = 0

    def __generateCities(self):
        """ Function generates a dictionary that contains all cities, and links between them. """
        citiesDict = {}
        for k in CITIES_TEMPLATE:
            citiesDict[k] = City(k, CITIES_TEMPLATE[k]["name"], CITIES_TEMPLATE[k]["connections"])
        return citiesDict

    def __generatePlayerDeck(self):
        """  """
        pass

    def __distributeHand(self):
        """ """
        pass

    def __shuffleEpidemicCards(self):
        """ """
        pass

    def movePlayer(self):
        """ Move to a connected city """
        pass

    def directFlight(self):
        """ Discard a city card to move to the city named on the card """
        pass

    def charterFlight(self):
        """ Discard the city card that matches the city you are in to move to any city """
        pass

    def shuttleFlight(self):
        """ Move from a city with a research station to any other city that has a research station """
        pass

    def buildResearhStation(self):
        """ Discard the city card that matches the city you are in to place a research station there """
        pass

    def shareKnowledge(self):
        """ Either: give the card that matches the city you are in to another player, or take that card from another player. Both players must be in the same city. """
        pass

    def discoverCure(self):
        """ at any research station, discard 5 city cards of the same disease colour to cure that disease """
        pass


class PlayerCard:
    """ Player City Card Definition """
    def __init__(self, id, name, description, population, area, color):
        self.id = id
        self.name = name
        self.description = description
        self.population = population
        self.area = area
        self.color = color
        self.type = "player"

class EventCard:
    """ Event Card Definition """
    def __init__(self, id, name, description):
        self.id = id
        self.name = name
        self.description = description
        self.type = "event"

class EpidemicCard:
    """ Infection Card Definition """
    def __init__(self, id, name, country, color):
        self.id = id
        self.name = name
        self.country = country
        self.color = color
        self.type = "epidemic"

class InfectionCard:
    """ Infection Card Definition """
    def __init__(self, id, name, country, color):
        self.id = id
        self.name = name
        self.country = country
        self.color = color
        self.type = "infection"



