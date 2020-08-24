/* ANSI SQL Plain Vanilla Test Data and Output */
/* Load the UniversityDDL.sql and UniversityDML.sql tables and data before starting*/

Questions:
	1.  Assume we are re using the University database.
	
/* Mission Quest */
/*Mission Quest 1 */
	/* Q1C1R1C:  C1: Req 1 Code */
	/* Paste the following code into the validator */
	CREATE TABLE Student_backup
	(
		Student_ID INT,
		Reg_no varchar(10) PRIMARY KEY,
		Name varchar(30),
		DOB date,
		Address varchar(50)
	);

	
	/* Q1C2R1O:  C2: Req1 Output : Check2: Output Student Backup Tbl */
	run: select * from Student_backup;
	
	20001	A1	AAA	2012-03-14	Germany
	20002	A2	BBB	2012-03-15	India
	20003	A3	CCC	2012-03-16	China
	20004	A4	DDD	2012-03-17	US
	20005	A5	EEE	2012-03-18	UK
	20006	A6	FFF	2012-03-19	Poland
	
	..
	/*Q1C3R2C:  C3: Req 2 Code : Requirement 2 Code */
	/* just paste the following statement into the validator: */
	SELECT course_id, CONCAT(CourseTitle, ' course code is ', CourseCode) AS CourseDetails, Current_students FROM TBL_Course;
	
	/*Q1C4R2O:  C4: Req 2 Output:  Requirement 2 Output */
	run:  SELECT course_id, CONCAT(CourseTitle, ' course code is ', CourseCode) AS CourseDetails, Current_students FROM TBL_Course;

	100058	Computer Science course code is MCS1002	800
	100059	Data Programming course code is DP1003	800
	100060	Computer Programming course code is CP1004	500
	100061	Web Programming course code is WP1005	600
	100062	Programming Languages course code is PL1006	900
	100063	Economics course code is EC1002	850
	100064	Econometrics course code is ECO1003	250
	100065	Economic Development course code is ED1004	300
	100066	Industrial Economics course code is IC1005	800
	100067	Financial Markets course code is FM1006	650
	100068	Biology course code is B1001	30
	100069	Cellular Biology and Biochemistry course code is CB1002	50
	100070	Diversity of Life course code is DL1003	45
	100071	Human Biology course code is HB1004	35
	100072	Ecology, Evolution and Conservation course code is EC1005	45
	100073	Accounts course code is AC1001	60
	100074	Financial Accounting course code is FA1002	50
	100075	Cost Accounting course code is CA1003	45
	100076	Insurance Financial Accounting course code is IF1004	45
	100077	Practices of Banking course code is PB1005	50
	100078	Business Law course code is BL1006	60
	100079	Nutrition course code is N1001	60
	100080	Dietary Guidelines course code is DG1002	45
	100081	Eat Right course code is ER1003	40
	100082	Music Academy course code is MC1001	900
	
	
	/*Q1C5R3C:  C5: Req 3 Code:  Requirement 3 Code */
	SELECT * FROM TBL_Course LIMIT 3 OFFSET 5;
	
	/*Q1C6R3O:  C6: Req 3 Output: Requirement 3 Output */
	run: 	SELECT * FROM TBL_Course LIMIT 3 OFFSET 5;
	
	100063	Economics	EC1002	20	MTWTHF	102	17	20008
	100064	Econometrics	ECO1003	10	MWTH	102	18	20015
	100065	Economic Development	ED1004	20	MTTH	102	18	20018
	
/* Mission Quest 2 */
	/*Q2C1R1C: C1: Req 1 Code :  Requirement 1 Code */
	/* just paste the following code into the validator: */
	CREATE TABLE books_order (
		OrderNum INT,
        OrderTime DATE, 
        ProdNum INT, 
        Quantity INT
	);
	
	/*Q2C2R1O : This requirement has been deleted */
	
	/*Q2C3R2C:  C3: Req 2 Code : Requirement 2 Code */
	/* just paste the following code into the validator */
	ALTER TABLE books_order ADD PRIMARY KEY (OrderNum);
	ALTER TABLE books_order ADD FOREIGN KEY (ProdNum) REFERENCES TBL_Course(Course_Id);

	
	/* C4: Req 3 Code : Requirement 3 Code */
	/* Just paste the following into the validator */
	ALTER TABLE TBL_Course ADD COLUMN course_fees INT;

	UPDATE TBL_Course SET course_fees = 15000 WHERE course_id = 100058;
	UPDATE TBL_Course SET course_fees = 25000 WHERE course_id = 100059;
	UPDATE TBL_Course SET course_fees = 10000 WHERE course_id = 100060;
	UPDATE TBL_Course SET course_fees = 30000 WHERE course_id = 100061;
	UPDATE TBL_Course SET course_fees = 20000 WHERE course_id = 100062;
	UPDATE TBL_Course SET course_fees = 15000 WHERE course_id = 100063;
	UPDATE TBL_Course SET course_fees = 25000 WHERE course_id = 100064;
	UPDATE TBL_Course SET course_fees = 35000 WHERE course_id = 100065;
	UPDATE TBL_Course SET course_fees = 25000 WHERE course_id = 100066;
	UPDATE TBL_Course SET course_fees = 15000 WHERE course_id = 100067;
	UPDATE TBL_Course SET course_fees = 15000 WHERE course_id = 100068;
	UPDATE TBL_Course SET course_fees = 25000 WHERE course_id = 100069;
	UPDATE TBL_Course SET course_fees = 15000 WHERE course_id = 100070;
	UPDATE TBL_Course SET course_fees = 10000 WHERE course_id = 100071;
	UPDATE TBL_Course SET course_fees = 15000 WHERE course_id = 100072;
	UPDATE TBL_Course SET course_fees = 25000 WHERE course_id = 100073;
	UPDATE TBL_Course SET course_fees = 15000 WHERE course_id = 100074;
	UPDATE TBL_Course SET course_fees = 15000 WHERE course_id = 100075;
	UPDATE TBL_Course SET course_fees = 25000 WHERE course_id = 100076;
	UPDATE TBL_Course SET course_fees = 15000 WHERE course_id = 100077;
	UPDATE TBL_Course SET course_fees = 10000 WHERE course_id = 100078;
	UPDATE TBL_Course SET course_fees = 15000 WHERE course_id = 100079;
	UPDATE TBL_Course SET course_fees = 15000 WHERE course_id = 100080;
	UPDATE TBL_Course SET course_fees = 15000 WHERE course_id = 100081;
	UPDATE TBL_Course SET course_fees = 15000 WHERE course_id = 100082;
	
	Run select * from TBL_Course;

	/* Q2C5R3O: C5: Req 3 Output : Requirement 3 Output */
	/* after running the above */
	100058	Computer Science	MCS1002	10	MWTH	101	17	20001	800	15000
	100059	Data Programming	DP1003	15	MWTH	101	17	20020	800	25000
	100060	Computer Programming	CP1004	10	MTTH	101	18	20006	500	10000
	100061	Web Programming	WP1005	20	MWTH	101	18	20010	600	30000

/* Mission Quest 3 */
	/* Q3C1R1C: C1: Req 1 Code : Requirement 1 Code */
	/* paste the following into the validator */
	SELECT COUNT(ts.student_id) Number_of_students ,tm.Major_name ,tm.major_id 
		FROM TBLstudents ts JOIN TBLMajor tm
		ON ts.major_id = tm.major_id
		GROUP BY ts.major_id; 
		
	/*Q3C2R1O: C2: Req 1 Output : Requirement 1 Output */
	/* run above SELECT COUNT statement and paste the following output into the validator */
	5	Computer Science	101
	5	Economics	102
	3	Biology	103
	3	Accounts	104
	3	Nutrition	105
	1	Music	106
		
	/* Q3C3R2C: C3: Req 2 Code : Requirement 2 Code */
	/* just paste the following into the validator */
	 SELECT student_id, CONCAT (first_name ,',',last_name) student_name 
		FROM TBLstudents 
			WHERE total_marks > (
				SELECT AVG (total_marks) FROM TBLstudents 
					WHERE major_id = (
						SELECT major_id 
							FROM TBLMajor 
							WHERE Major_name ='Biology'
					)
			);
			
	/*Q3C4R2O: C4: Req 2 Output:  Requirement 2 Output */
	/* run the above query */
	20001	James,Stud
	20008	Sathya,Samuel
	20009	Smitha,Shyam
	20011	Gerald,Gohn
	20012	Rita,Kumar
	20016	Vishal,Gupta

	/* Q3C5R3C: C5: Req 3 Code : Requirement 3 Code */
	/* Just paste the following code into the validator */
	SELECT ts.student_id, ts.first_name,ts.total_marks,
		CASE substring(ts.studentyear,3,2) 
			WHEN '12' THEN 'Joined on 2012'
			WHEN '13' THEN 'Joined on 2013'
			WHEN '14' THEN 'Joined on 2014'
		END Year_of_Joining
	FROM TBLstudents ts
		WHERE ts.total_marks BETWEEN 300 AND 400   
		ORDER BY student_id ASC;
		

	
	/*Q3C6R3O: C6: Req 3 Output */
	20001	James	400	Joined on 2012
	20008	Sathya	394	Joined on 2014
	20009	Smitha	374	Joined on 2014
	20011	Gerald	398	Joined on 2012
	20012	Rita	308	Joined on 2012
	20016	Vishal	392	Joined on 2012
	
	/* Q3C7R4C: C7: Req 4 Code */
	/* Paste the following code in the validator */
	SELECT tl.Lecturername, COUNT(tl.course_id) AS NumberOfCourses, 
       SUM(tc.current_students) NumberOfStudents 
		FROM TBL_Lecturer tl JOIN TBL_Course tc
		ON tl.course_id = tc.course_id
		WHERE tl.available ='Yes'
		GROUP BY tl.Lecturername
		HAVING COUNT(tl.course_id) > 2 AND COUNT(tl.course_id) < 5
		ORDER BY NumberOfCourses;
		
	/* Q3C8R4O: C8: Req 4 Output */
	/* Run the above SELECT statement and paste the output in the validator */
	/* because NumberOfCourses has so many 3's, the orderby will come out
	   in various orders.  Make sure to use proper look-aheads here. */
	Elizabeth	3	160
	Lucy	3	110
	Peter	3	165
	Sharmila	3	145
	Suman	3	125
	Shiny	3	1900
	Kumar	4	2700

/* Mission Quest 4 */
	/* Q4C1R1C: C1: Req 1 Code : Requirement 1 Code */
	/* Paste into validator */
	SELECT ts.student_id, ts.first_name, ts.studentcountry, a.student_id, a.address
		FROM TBLstudents ts LEFT OUTER JOIN address a
		ON ts.student_id = a.student_id;
	
	/* Q4C2R1: C2: Req 1 Output */
	/* Run the above SELECT statement and paste output into validator */
	20001	James	Germany	20001	US
	20002	Ruthra	India	20002	India
	20003	Kishore	India	20003	
	20004	Mishra	India	20004	Berlin
	20005	Gupta	India	20005	Poland
	20006	Mithra	India	20006	Nepal
	20007	Lohita	India	20007	Germany
	20008	Sathya	India	20008	Srilanka
	20009	Smitha	India	20009	UK
	20010	Rose	United States	20010	Japan
	20011	Gerald	United States	20011	
	20012	Rita	United States	20012	Russia
	20013	Michael	United States	20013	US
	20014	Ethan	United States	20014	
	20015	Luis	United States	20015	Sweden
	20016	Vishal	India	20016	Bhutan
	20017	Chirst	France	20017	China
	20018	Alfred	France	20018	
	20019	Benjamin	France	20019	
	20020	Chin	China	20020	US

	/*Q4C3R2C: C3: Req 2 Code : Requirement 2 Code */
	/* Paste the following code into the validator */
	SELECT ts.student_id, ts.first_name, ts.studentcountry, a.student_id, a.address
		FROM TBLstudents ts RIGHT OUTER JOIN address a
		ON ts.student_id = a.student_id;
	
	/* Q4C4R2O: C4: Req 2 Output */
	/* Run the above code and paste output into the validator */
		20001	James	Germany	20001	US
		20002	Ruthra	India	20002	India
		20003	Kishore	India	20003	
		20004	Mishra	India	20004	Berlin
		20005	Gupta	India	20005	Poland
		20006	Mithra	India	20006	Nepal
		20007	Lohita	India	20007	Germany
		20008	Sathya	India	20008	Srilanka
		20009	Smitha	India	20009	UK
		20010	Rose	United States	20010	Japan
		20011	Gerald	United States	20011	
		20012	Rita	United States	20012	Russia
		20013	Michael	United States	20013	US
		20014	Ethan	United States	20014	
		20015	Luis	United States	20015	Sweden
		20016	Vishal	India	20016	Bhutan
		20017	Chirst	France	20017	China
		20018	Alfred	France	20018	
		20019	Benjamin	France	20019	
		20020	Chin	China	20020	US
		
	/*Q4C5R3C: C5: Req 3 Code Requirement 3 Code */
	/* Paste the following code into the validator */
	SELECT DISTINCT a.Course_Id, a.coursetitle, b.Max_Course_fees 
		FROM  TBL_Course as a 
			INNER JOIN (SELECT MAX(Course_fees) AS Max_Course_fees    
			FROM TBL_Course)b  
				ON a.course_fees = b.Max_Course_fees 
				ORDER BY a.Course_Id;
	
	/*Q4C6R3O: C6: Req 3 Output */
	/* Run the above code and paste the output into the validator */
	100065	Economic Development	35000

				




	
