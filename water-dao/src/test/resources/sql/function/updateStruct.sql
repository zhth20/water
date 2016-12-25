CREATE DEFINER = `root`@`localhost` FUNCTION `updateStruct`(`a` integer,`b` integer,`m` integer,`p` varchar(50),`f` integer)
 RETURNS int(11)
BEGIN
	#Routine body goes here...
	DECLARE sTemp VARCHAR(20);
	DECLARE res int default 0;
	SET res = 10;
	SELECT group_concat(id) INTO sTemp FROM struct WHERE lineA=a AND lineB=b and map=m;
	IF sTemp <=> NULL THEN
		SET res = 20;
	ELSE
		IF f = 0 THEN
			UPDATE struct SET points = p,flag = 1 WHERE id = CONVERT(sTemp,SIGNED);
		ELSE
			UPDATE struct SET point = p,b = 1 WHERE id = CONVERT(sTemp,SIGNED);
		END IF;
		SET res = 1;
	END IF;
	RETURN res;
END;

