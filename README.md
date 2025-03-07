# Wordle Help

This is a React app to help Wordle players find their next guess. 
Users can enter their guesses and the green/yellow/gray results they get from the game, 
and the app will return suggestions for their next guess.

## Test Sequences

### Test 1
- WRIST :green_square: :white_large_square: :yellow_square: :white_large_square: :white_large_square:
- WIMPY :green_square: :green_square: :white_large_square: :white_large_square: :white_large_square:  
- WIDOW :green_square: :green_square: :green_square: :white_large_square: :white_large_square:  
- WIDEN :green_square: :green_square: :green_square: :green_square: :green_square:

### Test 2: The two W's can be challenging
- WRIST :green_square: :white_large_square: :yellow_square: :white_large_square: :white_large_square:
- WIMPY :green_square: :green_square: :white_large_square: :white_large_square: :white_large_square:
- WIDEN :green_square: :green_square: :green_square: :white_large_square: :white_large_square:
- WIDOW :green_square: :green_square: :green_square: :green_square: :green_square: 

### Test 3
- TREAT :white_large_square: :white_large_square: :white_large_square: :white_large_square: :green_square:
- POINT :white_large_square: :yellow_square: :white_large_square: :white_large_square: :green_square:
- SHOUT :yellow_square: :green_square: :green_square: :white_large_square: :green_square:
- GHOST :green_square: :green_square: :green_square: :green_square: :green_square: