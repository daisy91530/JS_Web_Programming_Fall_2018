# HW3 Write a card game (finish)

Display six cards that can play the binary cards game 
Finish the magic card game
Details are in the pdf

### 答題過程
首先勾選出卡片，這時候還來得及反悔，按下uncheck按鈕可以清除我以勾勾，選好後，加上summit按鈕，按下之後呼叫 guess()這個function先算出嗄案，算出後再呼叫start() 設下timer 每500ms call 一次blink()也就是閃一次，每次閃都先隨機找一個數字，每個卡片上的那個數字背景變色，同時用「.」來當作電腦正在計算。總共閃六次，所以設3000ms才呼叫stop()這個函數，這時候顯示答案是多少，然後讓答案背景變色。
