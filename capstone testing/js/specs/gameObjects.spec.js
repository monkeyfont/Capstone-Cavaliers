(function(){
	
	describe('The Player Object',function(){
		
		it('can pass a test',function(){
			expect(1).toBe(1);
		});
		testPlayer = new player({
			id:"test player",
			context: "No Context",
			width: 256,
			height: 256,
			numberOfFrames: 4,
			ticksPerFrame: 16,
			xPos:0,
			yPos:0,
			xScale:0.15,
			yScale:0.15,
			image: "No Image"	
		});
		
		it('can initalize a players location',function(){
			expect(testPlayer.xPos).toEqual(0);
			expect(testPlayer.yPos).toEqual(0);
		});
		
		it('can initalise a players movement',function(){
			expect(testPlayer.moveX).toEqual(0);
			expect(testPlayer.moveY).toEqual(0);
		});
		
		console.log(testPlayer.moveX,testPlayer.moveY)
		it('can initalize a move',function(){
			testPlayer.move(200,200)
			expect(testPlayer.moveX).toEqual(200);
			expect(testPlayer.moveY).toEqual(200);
		});
		
		it('can update a players movement',function(){
			xDistanceBeforeUpdate = Math.abs(testPlayer.moveX)-Math.abs(testPlayer.xPos)
			yDistanceBeforeUpdate = Math.abs(testPlayer.moveY)-Math.abs(testPlayer.yPos)
			testPlayer.update()
			xDistanceAfterUpdate = Math.abs(testPlayer.moveX)-Math.abs(testPlayer.xPos)
			yDistanceAfterUpdate = Math.abs(testPlayer.moveY)-Math.abs(testPlayer.yPos)
			expect(xDistanceAfterUpdate).toBeLessThan(xDistanceBeforeUpdate);
			expect(yDistanceAfterUpdate).toBeLessThan(xDistanceBeforeUpdate);
		});
		
		
		
	});
	
	describe('The city Object',function(){
		var testCity = new city({id:'testCity', colour:'black', xPos:0, yPos:0, connections:[], context:"No Canvas"});
		it('can initalise city',function(){
			expect(testCity.colour).toEqual("black");
			expect(testCity.xPos).toEqual(0);
			expect(testCity.yPos).toEqual(0);
		});
		
		it('can be infected',function(){
			expect(testCity.infectionStatus.black).toEqual([]);
			testCity.infect({});
			expect(testCity.infectionStatus.black).not.toEqual([]);
		});
		
		it('can be Disinfected',function(){
			testCity.disinfect({});
			expect(testCity.infectionStatus.black).toEqual([]);
		});
		
		
	});
}());