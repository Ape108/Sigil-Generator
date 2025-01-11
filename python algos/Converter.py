# User Input (should be a string of no more than 7 words)
def get_user_input():
    return input("Enter a string of no more than 7 words: ")

def remove_spaces_and_vowels(user_input):
    return ''.join(e for e in user_input if e.isalpha() and e.lower() not in 'aeiou')

def remove_duplicate_letters(user_input):
    return ''.join(sorted(set(user_input), key=user_input.index))

def convert_to_numbers(user_input):
    # Create mapping dictionary for letters to numbers
    number_mapping = {
        'A': '1', 'J': '1', 'S': '1',
        'B': '2', 'K': '2', 'T': '2',
        'C': '3', 'L': '3', 'U': '3',
        'D': '4', 'M': '4', 'V': '4',
        'E': '5', 'N': '5', 'W': '5',
        'F': '6', 'O': '6', 'X': '6',
        'G': '7', 'P': '7', 'Y': '7',
        'H': '8', 'Q': '8', 'Z': '8',
        'I': '9', 'R': '9'
    }
    
    # Convert input to uppercase and process each character
    result = ''
    for char in user_input.upper():
        if char.isalpha():
            result += number_mapping.get(char, '')
    
    return result

def output_result(user_input):
    print(f"Original input: {user_input}")
    # First remove spaces and vowels
    no_spaces_vowels = remove_spaces_and_vowels(user_input)
    print(f"After removing spaces and vowels: {no_spaces_vowels}")
    # Then remove duplicates from that result
    no_duplicates = remove_duplicate_letters(no_spaces_vowels)
    print(f"After removing duplicate letters: {no_duplicates}")
    # Finally convert to numbers
    final_numbers = convert_to_numbers(no_duplicates)
    print(f"After converting to numbers: {final_numbers}")

def main():
    user_input = get_user_input()
    output_result(user_input)

if __name__ == "__main__":
    main()