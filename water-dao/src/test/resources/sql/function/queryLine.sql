CREATE DEFINER = `root`@`localhost` FUNCTION `queryLine`(`id` integer,`str` varchar(4000),`m` integer)
 RETURNS varchar(4000)
BEGIN
	#Routine body goes here...
	DECLARE sTemp VARCHAR(4000);
	DECLARE sTempChd VARCHAR(4000);
	SET sTemp = '$';
	SET sTempChd = cast(id as char);
	WHILE sTempChd is not NULL DO
	SET sTemp = CONCAT(sTemp,',',sTempChd);
	SELECT group_concat(c.line) INTO sTempChd 
	FROM 
	(
		SELECT a.lineA as line FROM struct a 
		WHERE FIND_IN_SET(a.lineB,sTemp)>0 AND FIND_IN_SET(a.lineA,sTemp)=0 AND FIND_IN_SET(a.id,str)=0 AND map=m
		UNION
		SELECT b.lineB FROM struct b 
		WHERE FIND_IN_SET(b.lineA,sTemp)>0 AND FIND_IN_SET(b.lineB,sTemp)=0 AND FIND_IN_SET(b.id,str)=0 AND map=m
	) c;
	END WHILE;
	RETURN replace(sTemp,'$,','');
END;

