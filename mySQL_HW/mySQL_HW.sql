USE sakila;

SET SQL_SAFE_UPDATES = 0;

# 1a. Display first and last name of all actors on the table actor
SELECT
	first_name, last_name 
FROM
	actor;

# 1b. Display first and last name in one column name Actor_Name
SELECT 
	CONCAT(first_name, ' ', last_name) Actor_Name
FROM 
	actor;

/*
2a. You need to find the ID number, first name, and last name of an actor,
 of whom you know only the first name, "Joe." 
 What is one query would you use to obtain this information?
 */
SELECT*FROM actor
WHERE first_name = "JOE";

 
# 2b. Find all actors whose last name contain the letters GEN:
SELECT *FROM actor
WHERE last_name LIKE '%GEN%';


/*
2c. Find all actors whose last names contain the letters LI. 
This time, order the rows by last name and first name, in that order:
*/
SELECT last_name, first_name
FROM actor
WHERE last_name LIKE '%LI%';

/*
2d. Using IN, display the country_id and country columns of the following countries: 
Afghanistan, Bangladesh, and China:
*/
SELECT country_id, country
FROM country
WHERE country IN ("Afghanistan","Bangladesh","China");

/*
3a. You want to keep a description of each actor. 
You don't think you will be performing queries on a description, 
so create a column in the table actor named description 
and use the data type BLOB (Make sure to research the type BLOB,
 as the difference between it and VARCHAR are significant).
 */
 ALTER TABLE actor ADD COLUMN Description BLOB;
 SELECT*FROM actor;
 /*
3b. Very quickly you realize that entering descriptions for each actor is too much 
effort. Delete the description column.*/

ALTER TABLE actor DROP COLUMN Description;

#4a. List the last names of actors, as well as how many actors have that last name.
SELECT last_name, COUNT(last_name) AS number_actors
FROM actor
GROUP BY last_name
ORDER BY last_name;

/*
4b. List last names of actors and the number of actors who have that last name, 
but only for names that are shared by at least two actors*/
SELECT last_name, COUNT(last_name) AS number_actors
FROM actor
WHERE number_actors >= 2;

/*4c. The actor HARPO WILLIAMS was accidentally entered in the actor table as
 GROUCHO WILLIAMS. Write a query to fix the record.*/
 
SELECT*FROM actor
WHERE first_name = "GROUCHO" AND last_name = "WILLIAMS";
UPDATE actor SET first_name  = "HARPO" WHERE first_name = "GROUCHO";

 
/*4d. Perhaps we were too hasty in changing GROUCHO to HARPO. 
It turns out that GROUCHO was the correct name after all! In a single query,
 if the first name of the actor is currently HARPO, change it to GROUCHO.*/
 UPDATE actor SET first_name  = "GROUCHO" WHERE first_name = "HARPO";

/*5a. You cannot locate the schema of the address table. 
Which query would you use to re-create it?
Hint: https://dev.mysql.com/doc/refman/5.7/en/show-create-table.html*/
SHOW CREATE TABLE address;

/*6a. Use JOIN to display the first and last names, as well as the address, 
of each staff member. Use the tables staff and address:*/
SELECT staff.first_name, staff.last_name, address.address
FROM staff
INNER JOIN  address
ON staff.address_id = address.address_id;


/*6b. Use JOIN to display the total amount rung up by each staff member
 in August of 2005. Use tables staff and payment.*/
SELECT staff.staff_id, SUM(payment.amount) AS total_amount_by_member
FROM payment
INNER JOIN staff
ON payment.staff_id = staff.staff_id
WHERE payment_date >=  "2005-08-01" AND payment_date <= "2005-08-31"
GROUP BY staff.staff_id;
 
 
/*6c. List each film and the number of actors who are listed for that film. 
Use tables film_actor and film. Use inner join.*/
SELECT film.title, COUNT(film.title) AS number_of_actors
FROM film
INNER JOIN film_actor
ON film.film_id = film_actor.film_id
GROUP BY film.title;


#6d. How many copies of the film Hunchback Impossible exist in the inventory system?
SELECT title, COUNT(title) AS number_of_copies
FROM film
WHERE title = "Hunchback Impossible"
GROUP BY title;


/*6e. Using the tables payment and customer and the JOIN command, 
list the total paid by each customer. List the customers alphabetically by last name: */
SELECT  customer.first_name, customer.last_name, SUM(payment.amount)  AS total_paid
FROM customer
INNER JOIN payment
ON customer.customer_id = payment.customer_id
GROUP BY customer.last_name, customer.first_name
ORDER BY customer.last_name ASC;


/*7a. The music of Queen and Kris Kristofferson have seen an unlikely resurgence. 
As an unintended consequence, films starting with the letters K and 
Q have also soared in popularity. Use subqueries to display the titles of 
movies starting with the letters K and Q whose language is English.*/
SELECT sub.*
FROM  (SELECT film.title, `language`.`name`
			  FROM film
              INNER JOIN `language`
              ON film.language_id = `language`.language_id) sub
WHERE sub.title LIKE 'K%' OR sub.title LIKE  'Q%';

/*the code below was my first attempt to subquery, the above code seem to 
be the correct one because it shows a cleaner output

 SELECT*
	FROM film
    JOIN ( SELECT `name`,language_id
			    FROM `language`
                WHERE `name` = "English") sub
	 ON film.language_id = sub.language_id
     WHERE title LIKE 'K%' OR title LIKE 'Q%'; */
                    
#7b. Use subqueries to display all actors who appear in the film Alone Trip.
SELECT sub.*, title
FROM ( 
			 SELECT actor.first_name, actor.last_name,film_actor.film_id
			 FROM actor
			 INNER JOIN film_actor
			 ON actor.actor_id = film_actor.actor_id
             ) sub
INNER JOIN film
ON sub.film_id = film.film_id
WHERE title = "Alone Trip";


/*7c. You want to run an email marketing campaign in Canada, 
for which you will need the names and email addresses of all Canadian customers.
 Use joins to retrieve this information.*/
SELECT  first_name, last_name, email, sub1.*
FROM ( 
			  SELECT sub.*,country
			  FROM ( SELECT address.address_id, city.country_id
			                 FROM address
                             INNER JOIN city
                             ON address.city_id = city.city_id
							) sub
               INNER JOIN country
               ON sub.country_id = country.country_id
               ) sub1
INNER JOIN customer
ON sub1.address_id = customer.address_id
WHERE country = "Canada";

 
/*7d. Sales have been lagging among young families, and you wish to 
target all family movies for a promotion. Identify all movies categorized as family
 films.*/
SELECT sub.*, `name`
 FROM ( 
			  SELECT film.title, film_category.category_id
			  FROM film
			  INNER JOIN film_category
			  ON film.film_id = film_category.film_id
              ) sub
INNER JOIN category
ON sub.category_id = category.category_id
WHERE `name` = "Family";
 
#7e. Display the most frequently rented movies in descending order.
SELECT sub.*,rental_id 
FROM (
			 SELECT  inventory.inventory_id, film.title
             FROM film
             INNER JOIN inventory
             ON film.film_id = inventory.film_id
              )sub
INNER JOIN rental
ON sub.inventory_id = rental.inventory_id
GROUP BY title, rental_id;

#7f. Write a query to display how much business, in dollars, each store brought in.
SELECT  store_id,  SUM(payment.amount) AS store_total
FROM payment
INNER JOIN staff
ON payment.staff_id = staff.staff_id
GROUP BY store_id;

#7g. Write a query to display for each store its store ID, city, and country.
SELECT store_id, sub.*
FROM(
            SELECT sub1.*,address_id
	        FROM(
                        SELECT  city.city, country.country, city.city_id
		                FROM country
                        INNER JOIN city
                        ON country.country_id = city.country_id
                        )sub1
			 INNER JOIN address
             ON sub1.city_id = address.city_id
			 ) sub
INNER JOIN store
ON sub.address_id = store.address_id;


/*7h. List the top five genres in gross revenue in descending order.
 (Hint: you may need to use the following tables: 
 category, film_category, inventory, payment, and rental.)*/
SELECT sub.* ,SUM(amount)AS gross_revenue
 FROM(
			SELECT sub1.*, rental.rental_id
            FROM(
                            SELECT sub2.*, inventory.inventory_id
                            FROM(
										SELECT category.`name`, film_category.film_id
										 FROM category
                                         INNER JOIN film_category
                                         ON category.category_id = film_category.category_id
                                         ) sub2
							INNER JOIN inventory
                            ON sub2.film_id = inventory.film_id
                            ) sub1
			INNER JOIN rental
            ON sub1.inventory_id = rental.inventory_id
            )sub
INNER JOIN payment
ON sub.rental_id = payment.rental_id
GROUP BY `name`
ORDER BY  gross_revenue DESC;


            
                                         
              
							
											
                                            
 
/*8a. In your new role as an executive, 
you would like to have an easy way of viewing the Top five genres by gross revenue.
 Use the solution from the problem above to create a view. 
 If you haven't solved 7h, you can substitute another query to create a view.*/
 
#8b. How would you display the view that you created in 8a?

/*8c. You find that you no longer need the view top_five_genres. 
Write a query to delete it.*/





