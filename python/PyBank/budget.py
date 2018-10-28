# import libraries
import os
import csv

file_path = os.path.join('budget_data.csv')

with open (file_path, newline='') as csvfile:
	pyBank = csv.reader(csvfile, delimiter=',')
	print(pyBank)
	header = next(pyBank)

	# empty list to store the months to be counted
	months = []
	revenues = []
		
	# empty value to store total amount
	total_amount = 0 
	difference = 0
	
	# creat forloop 
	for row in pyBank:

		# add the months to the empty months list
		months.append(row[0])
		revenues.append(row[1])

		# sum all the values in revenue, values will be added to total amount
		total_amount += int(row[1])

	# convert revenue into a list of integers	
	revenue_int = list(map(int, revenues))

	# count the number of items added to the empty months list
	total_months = len(months)

	# create an empty list to store change in revenue month by month
	change_list = []

	'''
	create a loop using the range in the list revenue_int minus 1
	because there wont be a change in the last row since there is nothing after
	at each time the loop runs it will give the difference by each month 
	that will be store in the empty list created above
	change will be the value of the first row minus the following row 
	looping through all rows
	'''
	for value in range(len(revenue_int)-1):
		change = int(revenue_int[value + 1]) - int(revenue_int[value])
		change_list.append(int(change))

	# sum all the values inside change_list to know the total change	
	sum_change = sum(change_list)

	# divide the total change by the total months (minus one month with no change) to get the average
	averageChange = sum_change /(total_months - 1)

	
		

	# using list of change_list, find the max revenue and the min revenue
	for i in change_list:
		if i > 0:
			increase = max(change_list)
		elif i < 0:
			decrease = min(change_list)

	#find index of revenue and months to find equivalente months to max and min revenue
	index_incr = change_list.index(max(change_list))
	index_decr = change_list.index(min(change_list))
		
	
	print("____________________________________________________________")	
	print("Budget Data Analysis")
	print("____________________________________________________________")		
	print("Total months: "+ str(total_months))
	print("Total amount: $" + str(total_amount))
	print("Average Change: $" + str(round(averageChange)))
	print("Greatest increase: $" + str(increase) + " (" + str(months[index_incr]) + ")")
	
	print("Greatest decrease: $" + str(decrease) + " (" + str(months[index_decr]) + ")")

	print("____________________________________________________________")


		

	
