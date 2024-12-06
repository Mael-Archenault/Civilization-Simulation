import os

# Set the current postion as the default directory
os.chdir(os.path.dirname(__file__))


with open("female_names.txt", 'r') as file:
    res = "["
    for line in file:
        res+='"'
        res+=line[:-1]
        res+='"'
        res+= ","
        res+="\n"
    res = res[:-1]
    res+="]"
with open("results.txt", 'w') as file:
    file.write(res)