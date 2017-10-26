class Lobby:
    """ Game class definition """
    def __init__(self,lobbyName):
        """ init def """
        self.name=lobbyName
        self.players={}
        self.privacy=""
        self.playerCount=0
        self.messageHistory = ""
        self.gameStarted=False
        self.difficulty=0
        self.playerRoles={"dispatcher":0,"medic":0,"operationsExpert":0,"quarantineSpecialist":0,"researcher":0,"scientist":0}

