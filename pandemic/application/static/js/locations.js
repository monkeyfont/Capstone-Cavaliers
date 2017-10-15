var SANFRANCISCO = new city({id:'SANFRANCISCO', colour:'blue',xPos:260,yPos:410,locationPointerX:20,locationPointerY:20,connections:['TOKYO','MANILA','LOSANGELES','CHICAGO']});
var CHICAGO = new city({id:'CHICAGO',colour:'blue',xPos:390,yPos:330,connections:['SANFRANCISCO','LOSANGELES','MEXICOCITY','ATLANTA','MONTREAL']});
var MONTREAL = new city({id:'MONTREAL',colour:'blue',xPos:520,yPos:350,connections:['CHICAGO','WASHINGTON','NEWYORK']});
var NEWYORK = new city({id:'NEWYORK',colour:'blue',xPos:590,yPos:400,connections:['MONTREAL','WASHINGTON','MADRID','LONDON']});
var ATLANTA = new city({id:'ATLANTA',colour:'blue',xPos:400,yPos:444,connections:['CHICAGO','MIAMI','WASHINGTON']});
var WASHINGTON = new city({id:'WASHINGTON',colour:'blue',xPos:533,yPos:475,connections:['MONTREAL','ATLANTA','MIAMI','NEWYORK']});
var LONDON = new city({id:'LONDON',colour:'blue',xPos:814,yPos:330,connections:['NEWYORK','MADRID','PARIS','ESSEN']});
var ESSEN = new city({id:'ESSEN',colour:'blue',xPos:895,yPos:355,connections:['LONDON','PARIS','MILAN','STPETERSBURG']});
var STPETERSBURG = new city({id:'STPETERSBURG',colour:'blue',xPos:988,yPos:315,connections:['ESSEN','ISTANBUL','MOSCOW']});
var MADRID = new city({id:'MADRID',colour:'blue',xPos:792,yPos:500,connections:['NEWYORK','SAOPAULO','ALGIERS','PARIS','LONDON']});
var PARIS = new city({id:'PARIS',colour:'blue',xPos:806,yPos:434,connections:['LONDON','MADRID','ALGIERS','MILAN','ESSEN']});
var MILAN = new city({id:'MILAN',colour:'blue',xPos:890,yPos:420,connections:['ESSEN','PARIS','ISTANBUL']});

var LOSANGELES = new city ({id:'LOSANGELES',colour:'yellow',xPos:258,yPos:508,connections:['SANFRANCISCO','CHICAGO','MEXICOCITY','SYDNEY']});
var MEXICOCITY = new city ({id:'MEXICOCITY',colour:'yellow',xPos:325,yPos:590,connections:['LOSANGELES','LIMA','BOGOTA','MIAMI','CHICAGO']});
var MIAMI = new city ({id:'MIAMI',colour:'yellow',xPos:430,yPos:530,connections:['ATLANTA','MEXICOCITY','BOGOTA','WASHINGTON']});
var BOGOTA = new city ({id:'BOGOTA',colour:'yellow',xPos:444,yPos:668,connections:['MIAMI','MEXICOCITY','LIMA','BUENOSAIRES','SAOPAULO']});
var LIMA = new city ({id:'LIMA',colour:'yellow',xPos:447,yPos:770,connections:['MEXICOCITY','SANTIAGO','BOGOTA']});
var SANTIAGO = new city ({id:'SANTIAGO',colour:'yellow',xPos:459,yPos:880,connections:['LIMA']});
var BUENOSAIRES = new city ({id:'BUENOSAIRES',colour:'yellow',xPos:566,yPos:855,connections:['BOGOTA','SAOPAULO']});
var SAOPAULO = new city ({id:'SAOPAULO',colour:'yellow',xPos:620,yPos:785,connections:['BOGOTA','BUENOSAIRES','LAGOS','MADRID']});
var LAGOS = new city ({id:'LAGOS',colour:'yellow',xPos:822,yPos:650,connections:['SAOPAULO','KINSHASA','KHARTOUM']});
var KHARTOUM = new city ({id:'KHARTOUM',colour:'yellow',xPos:1000,yPos:640,connections:['LAGOS','KHARTOUM','JOHANNESBURG','CAIRO']});
var KINSHASA = new city ({id:'KINSHASA',colour:'yellow',xPos:924,yPos:700,connections:['LAGOS','JOHANNESBURG','KHARTOUM']});
var JOHANNESBURG = new city ({id:'JOHANNESBURG',colour:'yellow',xPos:980,yPos:850,connections:['KINSHASA','KHARTOUM']});

var SYDNEY = new city({id:'SYDNEY', colour:'red', xPos:1670, yPos:904, connections:['MANILA','JAKARTA','LOSANGELES']});
var JAKARTA= new city({id:'JAKARTA', colour:'red', xPos:1430, yPos:730, connections:['SYDNEY','HOCHIMINHCITY','BANGKOK','CHENNAI']});
var MANILA = new city({id:'MANILA', colour:'red', xPos:1510, yPos:590, connections:['SYDNEY','SANFRANCISCO','HOCHIMINHCITY','HONGKONG']});
var HOCHIMINHCITY = new city({id:'HOCHIMINHCITY', colour:'red', xPos:1430, yPos:630, connections:['MANILA','JAKARTA','BANGKOK','HONGKONG']});
var BANGKOK = new city({id:'BANGKOK', colour:'red', xPos:1360, yPos:570, connections:['KOULKATA','HONGKONG','HOCHIMINHCITY','JAKARTA','CHENNAI']});
var TAIPEI  = new city({id:'TAIPEI', colour:'red', xPos:1520, yPos:540, connections:['OSAKA','SHANGHAI','HONGKONG','MANILA']});
var OSAKA = new city({id:'OSAKA', colour:'red', xPos:1546, yPos:480, connections:['TOKYO','TAIPEI']});
var TOKYO = new city({id:'TOKYO', colour:'red', xPos:1590, yPos:400, connections:['SEOUL','OSAKA','SANFRANCISCO','SHANGHAI']});
var HONGKONG = new city({id:'HONGKONG', colour:'red', xPos:1430, yPos:520, connections:['SHANGHAI','TAIPEI','MANILA','HOCHIMINHCITY','BANGKOK','KOULKATA']});
var SHANGHAI = new city({id:'SHANGHAI', colour:'red', xPos:1400, yPos:440, connections:['BEIJING','SEOUL','TOKYO','TAIPEI','HONGKONG']});
var SEOUL = new city({id:'SEOUL', colour:'red', xPos:1485, yPos:365, connections:['TOKYO','SHANGHAI','BEIJING']});
var BEIJING = new city({id:'BEIJING', colour:'red', xPos:1345, yPos:375, connections:['SEOUL','SHANGHAI']});

var KOULKATA = new city({id:'KOULKATA', colour:'black', xPos:1315, yPos:490, connections:['HONGKONG','BANGKOK','CHENNAI','DELHI']});
var CHENNAI = new city({id:'CHENNAI', colour:'black', xPos:1280, yPos:606, connections:['DELHI','KOULKATA','BANGKOK','JAKARTA','MUMBAI']});
var DELHI = new city({id:'DELHI', colour:'black', xPos:1270, yPos:405, connections:['KOULKATA','CHENNAI','MUMBAI','KARACHI','TEHRAN']});
var MUMBAI = new city({id:'MUMBAI', colour:'black', xPos:1245, yPos:540, connections:['KARACHI','DELHI','CHENNAI']});
var KARACHI = new city({id:'KARACHI', colour:'black', xPos:1190, yPos:460, connections:['TEHRAN','DELHI','MUMBAI','RIYADH','BAGHDAD']});
var RIYADH = new city({id:'RIYADH', colour:'black', xPos:1090, yPos:555, connections:['BAGHDAD','KARACHI','CAIRO']});
var TEHRAN = new city({id:'TEHRAN', colour:'black', xPos:1155, yPos:370, connections:['DELHI','KARACHI','BAGHDAD','MOSCOW']});
var MOSCOW = new city({id:'MOSCOW', colour:'black', xPos:1015, yPos:390, connections:['TEHRAN','ISTANBUL','STPETERSBURG']});
var BAGHDAD = new city({id:'BAGHDAD', colour:'black', xPos:1075, yPos:490, connections:['TEHRAN','KARACHI','RIYADH','CAIRO','ISTANBUL']});
var CAIRO = new city({id:'CAIRO', colour:'black', xPos:990, yPos:520, connections:['ISTANBUL','BAGHDAD','RIYADH','ALGIERS']});
var ISTANBUL = new city({id:'ISTANBUL', colour:'black', xPos:980, yPos:460, connections:['STPETERSBURG','MOSCOW','BAGHDAD','CAIRO','ALGIERS','MILAN']});
var ALGIERS = new city({id:'ALGEIRS', colour:'black', xPos:900, yPos:500, connections:['PARIS','ISTANBUL','CAIRO','MADRID']});
// var LOSANGELES = new city ({id:,colour:'yellow',xPos:0,yPos:0,connections:[]});

var locations = {SANFRANCISCO,CHICAGO,MONTREAL,NEWYORK,ATLANTA,WASHINGTON,LONDON,ESSEN,STPETERSBURG,MADRID,PARIS,MILAN,
LOSANGELES,MEXICOCITY,MIAMI,BOGOTA,LIMA,SANTIAGO,BUENOSAIRES,SAOPAULO,LAGOS,KHARTOUM,KINSHASA,JOHANNESBURG,
SYDNEY,JAKARTA,MANILA,HOCHIMINHCITY,BANGKOK,TAIPEI,OSAKA,TOKYO,HONGKONG,SHANGHAI,SEOUL,BEIJING,
KOULKATA,CHENNAI,DELHI,MUMBAI,KARACHI,RIYADH,TEHRAN,MOSCOW,BAGHDAD,CAIRO,ISTANBUL,ALGIERS
};
