# temp cities dictionary. id : {name: string, connections : [id], x:int, y:int}
CITIES_TEMPLATE = {
    1:{"connections":[2,3], "name": "city1", "x":100, "y":100},
    2:{"connections":[1,4], "name": "city2", "x":400, "y":400},
    3:{"connections":[1,4], "name": "city3", "x":630, "y":720},
    4:{"connections":[2,3], "name": "city4", "x":802, "y":605}
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
    def __init__(self, playerid, name="Player"):
        """ init def """
        self.id = playerid
        self.name = name
        self.role = 0
        self.hand = []
        self.location = 1
        self.host = 0
        self.room = 0
    def getRoom(self):
        return self.room
    def setRoom(self,roomid):
        self.room = roomid
    def getid(self):
        return self.id
    def setid(self,playerid):
        self.id = playerid
class GameBoard:
    """ Game class definition """
    def __init__(self, infection_deck, player_deck):
        """ init def """
        self.cities = self.__generateCities()
        self.infectionDeck = infection_deck
        self.infectionDiscarded = []
        self.playerDeck = player_deck
        self.playerDiscarded = []
        self.researchStations = [1] #city ids where research stations are
        self.player1 = Player(1)
        self.player2 = Player(2)
        self.player3 = Player(3)
        self.player4 = Player(4)

    def __generateCities(self):
        """ Function generates a dictionary that contains all cities, and links between them. """
        citiesDict = {}
        for k in CITIES_TEMPLATE:
            citiesDict[k] = City(k, CITIES_TEMPLATE[k]["name"], CITIES_TEMPLATE[k]["connections"])
        return citiesDict
