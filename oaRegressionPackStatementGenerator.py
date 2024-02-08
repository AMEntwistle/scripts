import sys
# Online Python - IDE, Editor, Compiler, Interpreter

def camelCaseInput(input):
    input_statement = ""
    counter = 0
    for word in input:
        counter += 1
        if counter == 1:
            continue
        if input_statement != "":
            input_statement += " "
            word = word.title()
        input_statement += word
    cc_input = input_statement.replace(" ", "")
    return input_statement, cc_input

def printStatement(input):
    input_statement, cc_input = camelCaseInput(input)
    
    print(f"Scenario: {input_statement.lower()}\n  When I navigate to {input_statement.lower()} oa page\n  Then Elements are displayed for {cc_input}Page")



printStatement(sys.argv)
