CREATE DEFINER = `root`@`localhost` FUNCTION `insertStruct`(`p` varchar(50),`m` integer)
 RETURNS int(11)
BEGIN
	#Routine body goes here...
	DECLARE sTemp VARCHAR(20);
	DECLARE sBegin VARCHAR(20);
	DECLARE sCurr VARCHAR(50);
	DECLARE num int default 0;
	DECLARE i int default 0;

	SET sBegin = reverse(substring_index(reverse(substring_index(p,',',1)),',',1));
	SELECT group_concat(c.line) INTO sTemp 
	FROM 
	(
		SELECT a.lineA as line FROM struct a 
		WHERE lineB=sBegin and map=m
		UNION
		SELECT b.lineB FROM struct b 
		WHERE lineA=sBegin and map=m
	) c;
	
	SET num = 1+(length(sTemp) - length(replace(sTemp,',','')));
	WHILE i<num DO
		SET i = i + 1;
		SET sCurr = reverse(substring_index(reverse(substring_index(sTemp,',',i)),',',1));
	
		IF FIND_IN_SET(sCurr,p)=0 THEN
			DELETE FROM struct WHERE (lineA=sCurr AND lineB=sBegin) OR (lineB = sCurr AND lineA=sBegin);
		END IF;
		#SET sTempChd = CONCAT(sTempChd,';',reverse(substring_index(reverse(substring_index(sTemp,',',i)),',',1)));
	END WHILE;

	SET num = 1+(length(p) - length(replace(p,',','')));
	SET i = 1;
	WHILE i<num DO
		SET i = i + 1;
		SET sCurr = reverse(substring_index(reverse(substring_index(p,',',i)),',',1));
	
		IF FIND_IN_SET(sCurr,sTemp)=0 THEN
			IF sCurr < sBegin THEN
				INSERT INTO struct(map, lineA, lineB) VALUES(m,sCurr,sBegin);
			ELSE
				INSERT INTO struct(map, lineA, lineB) VALUES(m,sBegin,sCurr);
			END IF;
		END IF;
		#SET sTempChd = CONCAT(sTempChd,';',reverse(substring_index(reverse(substring_index(sTemp,',',i)),',',1)));
	END WHILE;
	#SET sTemp ='533,495,536,570';
	
	RETURN 0;
END;

