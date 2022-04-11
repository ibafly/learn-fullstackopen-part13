CREATE TABLE blogs(
id SERIAL PRIMARY KEY,
author text,
url text NOT NULL,
title text NOT NULL,
likes integer DEFAULT 1
);

insert into blogs (author,url,title) values ('Cat','101.cat','Nya nya');
insert into blogs (author,url,title) values ('Dog','101.dog','Bark bark');
