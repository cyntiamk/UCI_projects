#import modules
import os
import csv

# create a file path
file_path = os.path.join('election_data.csv')

# open the pyPoll csv file 
with open(file_path, newline='') as csvfile:
	pyPoll = csv.reader(csvfile, delimiter=',')
	print(pyPoll)
	# skip the header
	csv_header = next(pyPoll)

	# create empty lists to store variables
	candidates1 = []
	khan = []
	li = []
	correy = []
	otooley = []

	# create forloop 
	for row in pyPoll:

		# for each row in the index 2, store the candidate in the empty list
		candidates1.append(row[2])
				
		'''
		create a conditional to look for and then store each
		candidate name in the assigned empty list
		 '''
		if row[2] == "Khan":
			khan.append(row[2])
	
		if row[2] == "Li":
			li.append(row[2])
	
		if row[2] == "Correy":
			correy.append(row[2])
	
		if row[2] == "O'Tooley":
			otooley.append(row[2])

	''' 
	using the list with each candidates name
	find out the len to see how many votes each candidate got
	'''		
	khanvotes = len(khan)
	livotes = len(li)
	correyvotes = len(correy)
	otooleyvotes = len(otooley)

	# sum each candidates vote to get the total votes
	total_votes = (int(khanvotes) + int(livotes) + int(correyvotes) + int(otooleyvotes))	
			

	
	# create empty sets to store the lists as sets
	set1 = set()
	set2 = set()
	candidates = set() 

	# creates 2 sets using the list of candidates
	set1.update(candidates1)
	set2.update(candidates1)

	# intersect the sets created to show each candidate only once
	candidates = set1 & set2		
	
	
	'''
	calculate the percentage by dividing the votes each candidate received
	by the total votes and multiplying by 100
	'''
	khan_perc = (int(khanvotes)/int(total_votes))*100

	li_perc = (int(livotes)/int(total_votes))*100

	correy_perc = (int(correyvotes)/int(total_votes))*100

	otooley_perc = (int(otooleyvotes)/int(total_votes))*100

	'''
	create a conditional to find out who got the highest amount of votes
	to find out who is the winner of the election
	'''
	if khan_perc > li_perc and correy_perc and otooley_perc:
		winner = "Khan"
		
	elif li_perc > khan_perc and correy_perc and otooley_perc:
		winner = "Li"
		
	elif correy_perc > khan_perc and  li_perc and otooley_perc:
		winner = "Correy"
	else:
		winner = "O'Tooley"
	


	print("_____________________________")
	print("Election Results")
	print("_____________________________")
	print("Total Votes: " + str(total_votes))
	print("_ _ _ _ _ _ _ _ _ _ _ _ _ _ _")

	print("Khan votes: " + str(round(khan_perc)) + "%" + " (" + str(khanvotes) + ")")
	print("Li votes: " + str(round(li_perc))+ "%" + " (" + str(livotes) + ")")
	print("Correy votes: " + str(round(correy_perc))+ "%" + " (" + str(correyvotes) + ")")
	print("O'Tooley votes: " + str(round(otooley_perc))+ "%" + " (" + str(otooleyvotes) + ")")
	print("_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ ")
	print(str(winner) + " is the winner!")
	print("______________________________")


