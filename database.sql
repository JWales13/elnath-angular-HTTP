CREATE TABLE food (
	id SERIAL PRIMARY KEY,
	name VARCHAR (25),
	deliciousness_rating INT NOT NULL,
	is_hot BOOLEAN NOT NULL
	);
	
		INSERT INTO food (name, deliciousness_rating, is_hot)
		VALUES ('pizza',75, true),
		('carbonara',93,TRUE),
		('chocolate',50,true);