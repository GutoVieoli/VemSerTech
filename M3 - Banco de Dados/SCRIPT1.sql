#1 select distinct territory_id from employee_territories

#2. select first_name, last_name from employees;

#2. select distinct last_name from employees;

#2. select * from employees where YEAR(birth_date) > 1970;

#2. select first_name, hire_date, title from employees where YEAR(hire_date) = 1993;

#2. select first_name, title from employees where YEAR(birth_date) between 1980 and 1985;

#2. select first_name, title from employees where YEAR(birth_date) = 1963 and YEAR(hire_date) = 1993;

#2. select first_name, title, reports_to from employees where reports_to = 5;

#2. select first_name, title, city from employees where city in ('Seattle', 'Kirkland');










#select * from employees where employee_id between 3 and 7

#select contact_title from customers where country = 'Germany'
#and contact_title like 'Sales%'

#select company_name, region from customers
#where region is null

#select company_name, country from customers 
#where country in ('Sweden', 'Denmark', 'Finland');

#select company_name from customers 
#where country = 'Germany' 
#and contact_title = 'Sales Representative'; 

#select company_name from customers where city = 'Vancouver';

#select distinct city as cidade from customers