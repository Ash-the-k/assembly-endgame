import { useState, useEffect } from 'react';
import { clsx } from 'clsx';
import { languages } from './languages';
import { getFarewellText, getRandomWord } from './utils';
import Confetti from 'react-confetti';

export default function AssemblyEndgame() {
  // State values
  const [currentWord, setCurrentWord] = useState(() => getRandomWord());
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [farewellText, setFarewellText] = useState('');

  // Derived values
  const numGuesses = languages.length - 1;
  const wrongGuessCount = guessedLetters.filter(
    (letter) => !currentWord.includes(letter),
  ).length;
  const numGuessesLeft = numGuesses - wrongGuessCount;
  const isTimeOut = timeLeft === 0;
  const isGameWon = currentWord
    .split('')
    .every((letter) => guessedLetters.includes(letter));
  const isGameLost = wrongGuessCount >= numGuesses || isTimeOut;
  const isGameOver = isGameWon || isGameLost;
  const lastGuessedLetter = guessedLetters[guessedLetters.length - 1];
  const isLastGuessIncorrect =
    lastGuessedLetter && !currentWord.includes(lastGuessedLetter);

  useEffect(() => {
    if (isGameOver) return;

    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => Math.max(prevTime - 1, 0));
    }, 1000);

    return () => clearInterval(timerId);
  }, [isGameOver]);

  // Static values
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';

  function addGuessedLetter(letter) {
    setGuessedLetters((prevLetters) => {
      if (prevLetters.includes(letter)) return prevLetters;

      const isWrongGuess = !currentWord.includes(letter);

      if (isWrongGuess) {
        setFarewellText(getFarewellText(languages[wrongGuessCount].name));
      }
      return [...prevLetters, letter];
    });
  }

  function startNewGame() {
    setCurrentWord(getRandomWord());
    setGuessedLetters([]);
    setTimeLeft(60);
    setFarewellText('');
  }

  const timePercentage = (timeLeft / 60) * 100;

  const timerContainerClass = clsx('timer-container', {
    danger: timeLeft <= 20 && !isGameOver,
  });

  const timerBarClass = clsx('timer-bar-fill', {
    danger: timeLeft <= 10 && !isGameOver,
  });

  const languageElements = languages.map((lang, index) => {
    const isLanguageLost = index < wrongGuessCount;
    const styles = {
      backgroundColor: lang.backgroundColor,
      color: lang.color,
    };
    const className = clsx('chip', isLanguageLost && 'lost');
    return (
      <span
        className={className}
        style={styles}
        key={lang.name}
      >
        {lang.name}
      </span>
    );
  });

  const letterElements = currentWord.split('').map((letter, index) => {
    const shouldRevealLetter = isGameLost || guessedLetters.includes(letter);
    const letterClassName = clsx(
      isGameLost && !guessedLetters.includes(letter) && 'missed-letter',
    );
    return (
      <span
        key={index}
        className={letterClassName}
      >
        {shouldRevealLetter ? letter.toUpperCase() : ''}
      </span>
    );
  });

  const keyboardElements = alphabet.split('').map((letter) => {
    const isGuessed = guessedLetters.includes(letter);
    const isCorrect = isGuessed && currentWord.includes(letter);
    const isWrong = isGuessed && !currentWord.includes(letter);
    const className = clsx({
      correct: isCorrect,
      wrong: isWrong,
    });

    return (
      <button
        className={className}
        key={letter}
        disabled={isGameOver}
        aria-disabled={guessedLetters.includes(letter)}
        aria-label={`Letter ${letter}`}
        onClick={() => addGuessedLetter(letter)}
      >
        {letter.toUpperCase()}
      </button>
    );
  });

  const gameStatusClass = clsx('game-status', {
    won: isGameWon,
    lost: isGameLost,
    farewell: !isGameOver && isLastGuessIncorrect,
  });

  function renderGameStatus() {
    if (!isGameOver && isLastGuessIncorrect) {
      return (
        <p className="farewell-message">
          {farewellText}
        </p>
      );
    }

    if (isGameWon) {
      return (
        <>
          <h2>You win!</h2>
          <p>Well done! 🎉</p>
        </>
      );
    }
    if (isGameLost) {
      return (
        <>
          <h2>Game over!</h2>
          <p>
            {isTimeOut
              ? "Time's up! Assembly took over 😭"
              : 'You lose! Better start learning Assembly 😭'}
          </p>
        </>
      );
    }

    return null;
  }

  return (
    <main className={isGameLost ? 'game-lost-shake' : ''}>
      {isGameWon && (
        <Confetti
          recycle={false}
          numberOfPieces={1000}
        />
      )}

      {isGameLost && <div className="game-over-overlay"></div>}

      <header>
        <h1>Assembly: Endgame</h1>
        <p>
          Guess the word within 8 attempts to keep the programming world safe
          from Assembly!
        </p>
      </header>

      <section className="guesses-left">
        Number of Languages Left: {numGuessesLeft}
      </section>

      <section className={timerContainerClass}>
        <div className="timer-info">
          <span>Time Left</span>
          <span>{timeLeft}s</span>
        </div>

        <div className="timer-bar">
          <div
            className={timerBarClass}
            style={{ width: `${timePercentage}%` }}
          ></div>
        </div>
      </section>

      <section
        aria-live="polite"
        role="status"
        className={gameStatusClass}
      >
        {renderGameStatus()}
      </section>

      <section className="language-chips">{languageElements}</section>

      <section className="word">{letterElements}</section>

      {/* Combined visually-hidden aria-live region for status updates */}
      <section
        className="sr-only"
        aria-live="polite"
        role="status"
      >
        <p>
          {currentWord.includes(lastGuessedLetter)
            ? `Correct! The letter ${lastGuessedLetter} is in the word.`
            : `Sorry, the letter ${lastGuessedLetter} is not in the word.`}
          You have {languages.length - 1 - wrongGuessCount} attempts left.
        </p>
        <p>
          Current word:{' '}
          {currentWord
            .split('')
            .map((letter) =>
              guessedLetters.includes(letter) ? letter + '.' : 'blank.',
            )
            .join(' ')}
        </p>
      </section>

      <section className="keyboard">{keyboardElements}</section>

      {isGameOver && (
        <button
          className="new-game"
          onClick={startNewGame}
        >
          New Game
        </button>
      )}
    </main>
  );
}
