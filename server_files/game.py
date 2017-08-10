from random import shuffle

# temp cities dictionary. id : {name: string, connections : [id], x:int, y:int}
CITIES_TEMPLATE = {
    1:{"connections":[2,3], "name": "city1", "x":100, "y":100},
    2:{"connections":[1,4], "name": "city2", "x":400, "y":400},
    3:{"connections":[1,4], "name": "city3", "x":630, "y":720},
    4:{"connections":[2,3], "name": "city4", "x":802, "y":605}
}

# id : {name, description}
INFECTION_CARDS = {
    1:{"city":"Atlanta", "country":"United States", "color":"blue"},
    2:{"city":"London", "country":"United Kingdom", "color":"blue"}

}

PLAYER_CARDS = {
    1: {"city": "Atlanta", "country": "United States", "population":"0", "area":"0", "color":"blue"},
    2: {"city": "London", "country": "United Kingdom", "population":"0", "area":"0", "color":"blue"}
}

EVENT_CARDS = {
    1:{"name":"Government Grant", "description":"Add 1 research station to any city ( no city card needed )"},
    2:{"name":"Airlift", "description":"Move any 1 pawn to any city, get permission before moving another player's pawn"},
    3: {"name": "testEvent", "description": "testEvent"},
    4: {"name": "testEvent", "description": "testEvent"},
    5: {"name": "testEvent", "description": "testEvent"},
    6: {"name": "testEvent", "description": "testEvent"}
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
        self.connections = connections # [id]

    def setResearchStation(self):
        self.researchStation = 1

    def removeResearchStation(self):
        self.researchStation = 0

    def getResearchStation(self):
        return self.researchStation

    def getConnections(self):
        return self.connections


class Player:
    """ Player class def """
    def __init__(self, id, name = "Player"):
        self.id = id
        self.name = name
        self.role = 0
        self.hand = []
        self.location = 1
        self.host = 0

    def setLocation(self, location):
        self.location = location
    def getLocation(self):
        return self.location

    def getid(self):
        return self.id
    def setid(self,id):
        self.id = id

class GameBoard:
    """ Game class definition """
    def __init__(self):
        """ init def """
        self.infectionRates = [2,2,2,3,3,4,4] # how many infection cards are drawn at the end of every turn
        '''
        self.cities = self.__generateCities() # {id : City}
        self.infectionDeck = self.__generateInfectionDeck() # [InfectionCard]
        self.playerDeck = self.__generatePlayerDeck() # [PlayerCard]
        '''
        self.infectionDiscarded = []
        self.playerDiscarded = []
        self.playerCount = 0
        self.players = {1:Player(1), 2:Player(2),3:Player(3), 4:Player(4)}
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
        self.gameID = 0
'''
        # start player at cityId1 (normally atlanta)
        self.players[1].setLocation(1)
        # place a research station at cityId1
        self.cities[1].setResearchStation()


    def __generateCities(self):
        """ Function generates a dictionary that contains all cities, and links between them. """
        citiesDict = {}
        for k in CITIES_TEMPLATE:
            citiesDict[k] = City(k, CITIES_TEMPLATE[k]["name"], CITIES_TEMPLATE[k]["connections"])
        return citiesDict

    def __generatePlayerDeck(self):
        """ Returns a list containing player card objects. Epidemic cards are NOT added."""
        cards = []
        for k in PLAYER_CARDS:
            cards.append(PlayerCard(k, PLAYER_CARDS[k]["name"], PLAYER_CARDS[k]["name"], PLAYER_CARDS[k]["description"], PLAYER_CARDS[k]["population"], PLAYER_CARDS[k]["color"]))
        return cards

    def __generateInfectionDeck(self):
        """ Returns a list containing infection card objects """
        cards = []
        for k in INFECTION_CARDS: #id,name,country,color
            cards.append(InfectionCard(k, INFECTION_CARDS[k]["city"], INFECTION_CARDS[k]["country"], INFECTION_CARDS[k]["color"]))
        return cards


    def __distributeHand(self):
        """ """
        pass

    def __infectCitiesStage(self):
        """ """
        # First shuffle the infection cards
        shuffle(self.infectionDeck)
        # draw first 3 cards, place 3 disease markers
        # draw next 3 cards, place 2 disease markers
        # draw final 3 cards, place 1 disease marker

    def __placeEpidemicCards(self):
        """ """
        pass

    def movePlayer(self, playerId, cityId):
        """
        card desc: Move to a connected city
        Move the player to the city that matches that cityID, only if they are connected.
        This sets the player object to that city, and the city object to know that the player is there.
        Returns: True if successful, False if unsuccessful.
        """
        # get current player city
        currentCityId = self.players[playerId].getLocation()
        currentCity = self.cities[currentCityId]
        if cityId in currentCity.getConnections():
            self.players[playerId].setLocation(cityId)
            return True
        else:
            return False


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

'''
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



