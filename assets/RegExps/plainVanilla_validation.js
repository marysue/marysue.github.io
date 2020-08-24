!function(){
	function evaluate (validationName, inStr){
        var maxScore = validations[validationName].maxScore;
        var checkValues = maxScore/validations[validationName].validations.length;
		//console.log(maxScore + "/" + validations[validationName].validations.length);
        var errTrack = 0;
        var score = 0;
        var result = {errors:[],score:0};
        
       for (var i in validations[validationName].validations) {
			var works = true;

			for (var ii in validations[validationName].validations[i]) {
				// assign once to simplify
				var obj = validations[validationName].validations[i][ii];
				var objRe = inStr.match(obj.re);
				//console.log("re: " + obj.re);
				//console.log("Found objRe: " + objRe);
				//if (objRe) console.log("objRe length: " + objRe.length);

				if (obj.num > 0){
					if (objRe) {
						if (!(objRe.length >= obj.num)) 
							works = false;		
					} else {
						works = false;
					}
				} else {
					//we didnt match, objRe would be null
					if (!(objRe)) works = false;
				}
				//If we have an object, and have defined a custom function, run length through it
				// for our additional validation
				//console.log("objRe : " + objRe);
				if ((objRe) &&(typeof obj.custom === "function"))
				{
						//console.log("Calling custom function.");
						if (!obj.custom(objRe, inStr)) 
							works = false;	
				}		
				if (!works) result["errors"][++errTrack] = obj.err;
           }

           if(works) score += checkValues;
        }
        result.score = Math.floor((score*100)/validations[validationName].maxScore);
        
				// serialize the json into a sting 
			var json_data = JSON.stringify(result);
			
			// call C2
			//console.log(json_data);		
			if (window["c2_callFunction"]){
				//window["c2_callFunction"].execute(validations[validationName], [json_data]) ;
				c2_callFunction("returnValidations", [json_data]) ;
			}
			else if (document.getElementById("resultsBox")){
				document.getElementById("resultsBox").value=json_data;
			}
	}
    
   var validations = {
        Q1C1R1C:{
            maxScore:1,
            validations:[
			//Solution:
			//CREATE TABLE Student_backup
            // (Student_ID INT,
			//  Reg_no varchar(10) PRIMARY KEY,
            //  Name varchar(30),
            // DOB date,
            //  Address varchar(50),
            //  CONSTRAINT student_student_Id_fk FOREIGN KEY(Student_ID) REFERENCES
            //                                                                                                                     TBLstudents(Student_ID));
			// check whether clauses CONSTRAINT and FOREGN KEY are present in query
                [{re:/CREATE TABLE Student_backup/mg,
                  err:"checkQ1Req1:  Expecting but did not find keyword: CREATE TABLE Student_backup",
				  num:0
                }]
			]
        },	
        Q1C2R1O:{
            maxScore:6,
            validations:[
                [{re:/(?=([\S\s]*)20001)(?=([\S\s]*)Germany)/,
                  err:"checkQ1Req2: Expecting but did not find values: 20001 and Germany",
				  num:0
                }],
			    [{re:/(?=([\S\s]*)20002)(?=([\S\s]*)India)/,
                  err:"checkQ1Req2: Expecting but did not find values: 20002 and India",
				  num:0
                }],
			    [{re:/(?=([\S\s]*)20003)(?=([\S\s]*)China)/,
                  err:"checkQ1Req2: Expecting but did not find values: 20003 and China",
				  num:0
                }],
			    [{re:/(?=([\S\s]*)20004)(?=([\S\s]*)US)/,
                  err:"checkQ1Req2: Expecting but did not find values: 20004 and US",
				  num:0
                }],
			    [{re:/(?=([\S\s]*)20005)(?=([\S\s]*)UK)/,
                  err:"checkQ1Req2: Expecting but did not find values: 20005 and UK",
				  num:0
                }],
			    [{re:/(?=([\S\s]*)20006)(?=([\S\s]*)Poland)/,
                  err:"checkQ1Req2: Expecting but did not find values: 20006 and Poland",
				  num:0
                }]
			]
        },
        Q1C3R2C:{
            maxScore:1,
            validations:[
			//SELECT course_id, CONCAT(CourseTitle, ' course code is ', 
			//  CourseCode) AS CourseDetails, Current_students FROM TBL_Course;
				[{re:/CONCAT/,
                  err:"Expecting but did not find keyword: CONCAT",
				  num:0
                }]
			]
        },
        Q1C4R2O:{
            maxScore:6,
            validations:[
				[{

				  re:/100058[.*?|\s.*?]*Computer Science course code is MCS1002[.*?|\s.*?]*800/mg,
                  err:"Expected but did not find: 100058 Computer Science course code is MCS1002  800",
				  num:0
                }],
				[{
				  re:/100059[.*?|\s.*?]*Data Programming course code is DP1003[.*?|\s.*?]*800/mg,
                  err:"Expected but did not find: 100059  Data Programming course code is DP1003   800",
				  num:0
                }],
				[{
				  re:/100060[.*?|\s.*?]*Computer Programming course code is CP1004[.*?|\s.*?]*500/mg,
                  err:"Expected but did not find: 100060  Computer Programming course code is CP1004   500",
				  num:0
                }],
				[{
				  re:/100061[.*?|\s.*?]*Web Programming course code is WP1005[.*?|\s.*?]*600/mg,			
                  err:"Expected but did not find: 100061  Web Programming course code is WP1005  600",
				  num:0
                }],
				[{
				  re:/100062[.*?|\s.*?]*Programming Languages course code is PL1006[.*?|\s.*?]*900/mg,			
                  err:"Expected but did not find: 100062  Programming Languages course code is PL1006  900",
				  num:0
                }],
				[{
				  re:/100063[.*?|\s.*?]*Economics course code is EC1002[.*?|\s.*?]*850/mg,					
				  err:"Expected but did not find: 100063  Economics course code is EC1002  850",
				  num:0
				}]
			]
        },
        Q1C5R3C:{
            maxScore:3,
			//SELECT * FROM TBL_Course LIMIT 3 OFFSET 5
            validations:[
			//SELECT
				[{re:/SELECT/mg,
                  err:"Expected but did not find keyword:  SELECT",
				  num:0
                }],
				//LIMIT 3
				[{re:/LIMIT.*?3/mg,
				err:"Expected but did not find keyword:  LIMIT 3",
				num:0
				}],
				//OFFSET 5
				[{re:/OFFSET.*?5/mg,
				err:"Expected but did not find keyword:  OFFSET 5",
				num:0
				}]	
			]
        },
        Q1C6R3O:{
            maxScore:3,
			 
            validations:[
				//Works in order with CRLF at every field - but not out of order
				//100063[.*?|\s.*?]*Economics[.*?|\s.*?]*EC1002[.*?|\s.*?]*20[.*?|\s.*?]*MTWTHF[.*?|\s.*?]*102[.*?|\s.*?]*17[.*?|\s.*?]*20008
			
				//Works in any order, but CRLF will halt match
				//If we allow CRLFs then we have to perform an individual search for each key throughout entire text
				[{re:/(?=.*\b100063\b)(?=.*\bEconomics\b)(?=.*\bEC1002\b)(?=.*\b20\b)(?=.*\bMTWTHF\b)(?=.*\b102\b)(?=.*\b17\b)(?=.*\b20008\b)/mg,
                  err:"Expected but did not find in any order on one line : 10063 Economics EC1002 20 MTWTHF 102 17 20008",
				  num:0
                }],
				
				[{re:/(?=.*?\b100064\b)(?=.*?\bEconometrics\b)(?=.*?\bECO1003\b)(?=.*?\b10\b)(?=.*?\bMWTH\b)(?=.*?\b102\b)(?=.*?\b18\b)(?=.*?\b20015\b)/mg,
				err:"Expected but did not find in any order on one line : 100064	Econometrics	ECO1003	10	MWTH	102	18	20015",
				num:0
				}],
				
				[{re:/(?=.*?\b100065\b)(?=.*?\bEconomic Development\b)(?=.*?\bED1004\b)(?=.*?\b20\b)(?=.*?\bMTTH\b)(?=.*?\b102\b)(?=.*?\b18\b)(?=.*?\b20018\b)/mg,
				err:"Expected but did not find in any order on one line : 100065	Economic Development	ED1004	20	MTTH	102	18	20018",
				num:0
				}]	
			]
        },
        Q2C1R1C:{
            maxScore:1,
            validations:[
                [{re:/CREATE TABLE books_order/,
                  err:"Expected but did not find:  CREATE TABLE books_order",
				  num:0
                }]
			]
        },
        Q2C2R1O:{
            maxScore:1,
            validations:[
                [{re:/FOO/,
                  err:"checkQ2Req2: This requirement has been deleted",
				  num:0
                }]
			]
        },
        Q2C3R2C:{
            maxScore:2,
            validations:[
			
                [{re:/ALTER TABLE books_order ADD PRIMARY KEY \(OrderNum\);/,
                  err:"Q2C3R2C: Expected but did not find: ALTER TABLE books_order ADD PRIMARY KEY (OrderNum);",
				  num:0
                }],
                [{re:/ALTER TABLE books_order ADD FOREIGN KEY \(ProdNum\) REFERENCES TBL_Course\(Course_Id\);/,
                  err:"Q2C3R2C: Expected but did not find: ALTER TABLE books_order ADD PRIMARY KEY (OrderNum);",
				  num:0
                }]			
			]
        },
        Q2C4R3C:{
            maxScore:1,
            validations:[
                [{re:/ALTER TABLE TBL_Course ADD COLUMN course_fees/mg,
                  err:"Q2C4R3C: Did not find: ALTER TABLE TBL_Course ADD COLUMN course_fees",
				  num:0
                }],
				
			]
        },
        Q2C5R3O:{
            maxScore:4,
            validations:[
	
                [{re:/15000/,
                  err:"Q2C5R3O: Did not find: course_fees of 15000",
				  num:0
                }],
				[{re:/25000/,
                  err:"Q2C5R3O: Did not find: course_fees of 25000",
				  num:0
                }],
                [{re:/10000/,
                  err:"Q2C5R3O: Did not find: course_fees of 10000",
				  num:0
                }],
                [{re:/30000/,
                  err:"Q2C5R3O: Did not find: course_fees of 30000",
				  num:0
                }]
			]
        },
        Q3C1R1C:{
            maxScore:4,
            validations:[
                [{re:/COUNT/,
                  err:"Q3C1R1C: Did not find COUNT",
				  num:0
                }],

				[{re:/JOIN/,
                  err:"Q3C1R1C: Did not find JOIN",
				  num:0
                }],
				[{re:/GROUP BY/,
                  err:"Q3C1R1C: Did not find GROUP BY",
				  num:0
                }],

				[{re:/ON/,
                  err:"Q3C1R1C: Did not find ON",
				  num:0
                }]				
			]
        },
        Q3C2R1O:{
            maxScore:5,
            validations:[
                [{re:/(?=.*\b5\b)(?=.*\bComputer Science\b)(?=.*\b101\b)/mg,
                  err:"Q3C2R10: Did not find  (in any order on the same line): 5 Computer Science 101",
				  num:0
                }],
				//If output contains 
				//D08
				//Vignesh				
                [{re:/(?=.*\b3\b)(?=.*\bBiology\b)(?=.*\b103\b)/mg,
                  err:"checkQ3Req2: Did not find (in any order on the same line): 3 Biology 103",
				  num:0
                }],
                [{re:/(?=.*\b3\b)(?=.*\bAccounts\b)(?=.*\b104\b)/mg,
                  err:"checkQ3Req2: Did not find  (in any order on the same line): 3 Accounts 104",
				  num:0
                }],
			    [{re:/(?=.*\b3\b)(?=.*\bNutrition\b)(?=.*\b105\b)/mg,
                  err:"checkQ3Req2: Did not find  (in any order on the same line): 3 Nutrition 105",
				  num:0
                }],
			    [{re:/(?=.*\b1\b)(?=.*\bMusic\b)(?=.*\b106\b)/mg,
                  err:"checkQ3Req2: Did not find  (in any order on the same line): 1 Music 106",
				  num:0
                }]				
			]
        },
        Q3C3R2C:{
            maxScore:2,
            validations:[

               [{re:/CONCAT/,
                  err:"Q3C3R2C: Did not find keyword CONCAT",
				  num:0
                }],								
               [{re:/AVG/,
                  err:"Q3C3R2C: Did not find keyword AVG",
				  num:0
                }]
			]
        },
		Q3C4R2O:{
            maxScore:6,
            validations:[

               [{re:/(?=.*\b20001\b)(?=.*\bJames\b)(?=.*\bStud\b)/,
                  err:"Q3C4R2O: Did not find 200001, James Stud (in any order on the same line)",
				  num:0
                }],								

               [{re:/(?=.*\b20008\b)(?=.*\bSathya\b)(?=.*\bSamuel\b)/,
                  err:"Q3C4R2O: Did not find 20008 Sathya Samuel (in any order on the same line)",
				  num:0
                }],
               [{re:/(?=.*\b20009\b)(?=.*\bSmitha\b)(?=.*\bShyam\b)/,
                  err:"Q3C4R2O: Did not find 20009 Smitha Shyam (in any order on the same line)",
				  num:0
                }],
               [{re:/(?=.*\b20011\b)(?=.*\bGerald\b)(?=.*\bGohn\b)/,
                  err:"Q3C4R2O: Did not find 20011 Gerald Gohn (in any order on the same line)",
				  num:0
                }],
               [{re:/(?=.*\b20012\b)(?=.*\bRita\b)(?=.*\bKumar\b)/,
                  err:"Q3C4R2O: Did not find 20012 Rita Kumar (in any order on the same line)",
				  num:0
                }],
               [{re:/(?=.*\b20016\b)(?=.*\bVishal\b)(?=.*\bGupta\b)/,
                  err:"Q3C4R2O: Did not find 20016 Vishal Gupta (in any order on the same line)",
				  num:0
                }]
			]
        },
		Q3C5R3C:{
            maxScore:6,
            validations:[

               [{re:/BETWEEN 300 AND 400/,
                  err:"Q3C5R3C: Did not find qualifier: BETWEEN 300 AND 400",
				  num:0
                }],								
               [{re:/CASE/,
                  err:"Q3C5R3C: Did not find keyword CASE",
				  num:0
                }],
               [{re:/WHEN/,
                  err:"Q3C5R3C: Did not find keyword WHEN",
				  num:0
                }],
               [{re:/THEN/,
                  err:"Q3C5R3C: Did not find keyword THEN",
				  num:0
                }],
               [{re:/END/,
                  err:"Q3C5R3C: Did not find keyword END ",
				  num:0
                }],
               [{re:/WHERE/,
                  err:"Q3C5R3C: Did not find keyword WHERE",
				  num:0
                }]
			]
        },
		Q3C6R3O:{
            maxScore:6,
            validations:[
               [{re:/(?=.*\b20001\b)(?=.*\bJames\b)(?=.*\b400\b)(?=.*\bJoined on 2012\b)/,
                  err:"Q3C6R3O: Did not find 20001 James 400 Joined on 2012(in any order on the same line)",
				  num:0
                }],								
               [{re:/(?=.*\b20008\b)(?=.*\bSathya\b)(?=.*\b394\b)(?=.*\bJoined on 2014\b)/,
                  err:"Q3C6R3O: Did not find 20008 Sathya 394 Joined on 2014 (in any order on the same line)",
				  num:0
                }],
               [{re:/(?=.*\b20009\b)(?=.*\bSmitha\b)(?=.*\b374\b)(?=.*\bJoined on 2014\b)/,
                  err:"Q3C6R3O: Did not find 20009 Smitha 374 Joined on 2014 (in any order on the same line)",
				  num:0
                }],
               [{re:/(?=.*\b20011\b)(?=.*\bGerald\b)(?=.*\b398\b)(?=.*\bJoined on 2012\b)/,
                  err:"Q3C6R3O: Did not find 20011 Gerald 398 Joined on 2012 (in any order on the same line)",
				  num:0
                }],
               [{re:/(?=.*\b20012\b)(?=.*\bRita\b)(?=.*\b308\b)(?=.*\bJoined on 2012\b)/,
                  err:"Q3C6R3O: Did not find 20012 Rita 308 Joined on 2012 (in any order on the same line)",
				  num:0
                }],
               [{re:/(?=.*\b20016\b)(?=.*\bVishal\b)(?=.*\b392\b)(?=.*\bJoined on 2012\b)/,
                  err:"Q3C6R3O: Did not find 20016 Vishal 392 Joined on 2012 (in any order on the same line)",
				  num:0
                }]
			]
        },
		Q3C7R4C:{
            maxScore:7,
            validations:[
               [{re:/SELECT .*?COUNT.*?AS/mg,
                  err:"Q3C7R4C: Did not find keyword COUNT in initial SELECT statement",
				  num:0
                }],								
               [{re:/SUM/mg,
                  err:"Q3C7R4C: Did not find keyword SUM",
				  num:0
                }],	
               [{re:/JOIN/mg,
                  err:"Q3C7R4C: Did not find keyword JOIN ",
				  num:0
                }],					
                [{re:/GROUP BY/mg,
                  err:"Q3C7R4C: Did not find qualifier GROUP BY ",
				  num:0
                }],	
               [{re:/HAVING COUNT/mg,
                  err:"Q3C7R4C: Did not find qualifier HAVING COUNT ",
				  num:0
                }],	
               [{re:/AND COUNT/mg,
                  err:"Q3C7R4C: Did not find qualifier AND COUNT",
				  num:0
                }],	
               [{re:/ORDER BY/mg,
                  err:"Q3C7R4C: Did not find qualifier ORDER BY",
				  num:0
                }]	
			]
      },
		Q3C8R4O:{
            maxScore:7,
            validations:[
               [{re:/(?=.*\bElizabeth\b)(?=.*\b3\b)(?=.*\b160\b)/,
                  err:"Q3C8R40O: Did not find Elizabeth 3 160(in any order on same line)",
				  num:0
                }],								
               [{re:/(?=.*\bLucy\b)(?=.*\b3\b)(?=.*\b110\b)/,
                  err:"Q3C8R40O: Did not find Lucy 3 110(in any order on same line)",
				  num:0
                }],	
               [{re:/(?=.*\bPeter\b)(?=.*\b3\b)(?=.*\b165\b)/,
                  err:"Q3C8R40O: Did not find Peter 3 165(in any order on same line)",
				  num:0
                }],	
               [{re:/(?=.*\bSharmila\b)(?=.*\b3\b)(?=.*\b145\b)/,
                  err:"Q3C8R40O: Did not find Sharmila 3 145(in any order on same line)",
				  num:0
                }],	
               [{re:/(?=.*\bSuman\b)(?=.*\b3\b)(?=.*\b125\b)/,
                  err:"Q3C8R40O: Did not find Suman 3 125(in any order on same line)",
				  num:0
                }],	
               [{re:/(?=.*\bShiny\b)(?=.*\b3\b)(?=.*\b1900\b)/,
                  err:"Q3C8R40O: Did not find Shiny 3 1900(in any order on same line)",
				  num:0
                }],	
               [{re:/(?=.*\bKumar\b)(?=.*\b4\b)(?=.*\b2700\b)/,
                  err:"Q3C8R40O: Did not find Kumar 4 2700(in any order on same line)",
				  num:0
                }]	
			]				
        },
        Q4C1R1C:{
            maxScore:1,
            validations:[
		
                [{re:/LEFT OUTER JOIN/,
                  err:"Q4C1R1C: Did not find qualifier LEFT OUTER JOIN",
				  num:0
                }]			
			]
        },
        Q4C2R1O:{
            maxScore:4,
            validations:[
                [{re:/(?=.*\b20001\b)(?=.*\bJames\b)(?=.*\bGermany\b)(?=.*\bUS\b)/mg,
                  err:"Q4C2R1O: Did not find 20001 James Germany 20001 US (in any order on the same row)",
				  num:0
                }],
                [{re:/(?=.*\b20005\b)(?=.*\bGupta\b)(?=.*\bIndia\b)(?=.*\bPoland\b)/mg,
                  err:"Q4C2R1O: Did not find 20005 Gupta India 20005 Poland (in any order on the same row)",
				  num:0
                }],
                [{re:/(?=.*\b20007\b)(?=.*\bLohita\b)(?=.*\bIndia\b)(?=.*\bGermany\b)/,
                  err:"Q4C2R1O: Did not find 20007 Lohita India 20007 Germany (in any order on the same row)",
				  num:0
                }],
                [{re:/(?=.*\b20008\b)(?=.*\bSathya\b)(?=.*\bIndia\b)(?=.*\bSrilanka\b)/,
                  err:"Q4C2R1O: Did not find 20008 Sathya India 20008 Srilanka (in any order on the same row)",
				  num:0
                }]				
			]
        },
        Q4C3R2C:{
            maxScore:1,
            validations:[
                [{re:/RIGHT OUTER JOIN/,
                  err:"Q4C3R2C: Did not find RIGHT OUTER JOIN",
				  num:0
                }]
			]
        },
        Q4C4R2O:{
            maxScore:7,
            validations:[
                [{re:/(?=.*\b20009\b)(?=.*\bSmitha\b)(?=.*\bIndia\b)(?=.*\bUK\b)/mg,
                  err:"Q4C4R2O: Did not find 20009 Smitha India 20009 UK (in any order on the same row)",
				  num:0
                }],
                [{re:/(?=.*\b20016\b)(?=.*\bVishal\b)(?=.*\bIndia\b)(?=.*\bBhutan\b)/mg,
                  err:"Q4C4R2O: Did not find 20016 Vishal India 20016 Bhutan (in any order on the same row)",
				  num:0
                }],
                [{re:/(?=.*\b20018\b)(?=.*\bAlfred\b)(?=.*\bFrance\b)/mg,
                  err:"Q4C4R2O: Did not find 20018 Alfred France 20018 (in any order on the same row)",
				  num:0
                }],
                [{re:/(?=.*\b20019\b)(?=.*\bBenjamin\b)(?=.*\bFrance\b)/mg,
                  err:"Q4C4R2O: Did not find 20019 Benjamin France 20019 (in any order on the same row)",
				  num:0
                }],
                [{re:/(?=.*\b20012\b)(?=.*\bRita\b)(?=.*\bUnited States\b)(?=.*\bRussia\b)/mg,
                  err:"Q4C4R2O: Did not find 20012 Rita United States 20012 Russia (in any order on the same row)",
				  num:0
                }],
                [{re:/(?=.*\b20015\b)(?=.*\bLuis\b)(?=.*\bUnited States\b)(?=.*\bSweden\b)/mg,
                  err:"Q4C4R2O: Did not find 20015 Luis United States 20015 Sweden (in any order on the same row)",
				  num:0
                }],
                [{re:/(?=.*\b20006\b)(?=.*\bMithra\b)(?=.*\bIndia\b)(?=.*\bNepal\b)/mg,
                  err:"Q4C4R2O: Did not find 20006 Mithra India 20006 Nepal (in any order on the same row)",
				  num:0
                }]				
			]
        },
        Q4C5R3C:{
            maxScore:1,
            validations:[
                [{re:/INNER JOIN/,
                  err:"Q4C5R3C: Did not find INNER JOIN",
				  num:0
                }]
			]
        },
        Q4C6R3O:{
            maxScore:1,
            validations:[
                [{re:/(?=.*\b100065\b)(?=.*\bEconomic Development\b)(?=.*\b35000\b)/mg,
                  err:"Q4C6R3O: Did not find 100065	Economic Development 35000(in any order on the same row)",
				  num:0
                }]
			]
        }
	}

	window["CodeEval"] = {"evaluate" :evaluate};
}();

