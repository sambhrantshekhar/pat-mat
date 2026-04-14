export const naiveSearch = (text, pattern) => {
  const tLen = text.length;
  const pLen = pattern.length;
  const indices = [];
  let comparisons = 0;

  if (pLen === 0 || tLen < pLen) {
    return { indices, comparisons, timeTaken: 0 };
  }

  const startTime = performance.now();

  for (let i = 0; i <= tLen - pLen; i++) {
    let j = 0;
    while (j < pLen) {
      comparisons++;
      if (text[i + j] !== pattern[j]) {
        break;
      }
      j++;
    }
    if (j === pLen) {
      indices.push(i);
    }
  }

  const endTime = performance.now();

  return {
    indices,
    comparisons,
    timeTaken: endTime - startTime,
  };
};

const computeLPSArray = (pattern, pLen) => {
  const lps = new Array(pLen).fill(0);
  let len = 0;
  let i = 1;
  let comparisons = 0;

  while (i < pLen) {
    comparisons++;
    if (pattern[i] === pattern[len]) {
      len++;
      lps[i] = len;
      i++;
    } else {
      if (len !== 0) {
        len = lps[len - 1];
      } else {
        lps[i] = 0;
        i++;
      }
    }
  }
  return { lps, comparisons };
};

export const kmpSearch = (text, pattern) => {
  const tLen = text.length;
  const pLen = pattern.length;
  const indices = [];
  let totalComparisons = 0;

  if (pLen === 0 || tLen < pLen) {
    return { indices, comparisons: totalComparisons, timeTaken: 0 };
  }

  const startTime = performance.now();

  const { lps, comparisons: lpsComparisons } = computeLPSArray(pattern, pLen);
  totalComparisons += lpsComparisons;

  let i = 0; // index for text
  let j = 0; // index for pattern

  while (i < tLen) {
    totalComparisons++;
    if (pattern[j] === text[i]) {
      j++;
      i++;
    } else {
      if (j !== 0) {
        j = lps[j - 1];
      } else {
        i++;
      }
    }

    if (j === pLen) {
      indices.push(i - j);
      j = lps[j - 1];
    }
  }

  const endTime = performance.now();

  return {
    indices,
    comparisons: totalComparisons,
    timeTaken: endTime - startTime,
  };
};

export const rabinKarpSearch = (text, pattern) => {
  const tLen = text.length;
  const pLen = pattern.length;
  const indices = [];
  let comparisons = 0;

  if (pLen === 0 || tLen < pLen) {
    return { indices, comparisons, timeTaken: 0 };
  }

  const startTime = performance.now();

  const d = 256;
  const q = 101; // A prime number

  let p = 0; // hash value for pattern
  let t = 0; // hash value for text
  let h = 1;

  // The value of h would be "pow(d, pLen-1)%q"
  for (let i = 0; i < pLen - 1; i++) {
    h = (h * d) % q;
  }

  // Calculate the hash value of pattern and first window of text
  for (let i = 0; i < pLen; i++) {
    p = (d * p + pattern.charCodeAt(i)) % q;
    t = (d * t + text.charCodeAt(i)) % q;
  }

  // Slide the pattern over text one by one
  for (let i = 0; i <= tLen - pLen; i++) {
    // Check the hash values of current window of text and pattern.
    comparisons++; // Comparing the hashes
    if (p === t) {
      // If the hash values match, check character by character
      let j = 0;
      for (j = 0; j < pLen; j++) {
        comparisons++; // Comparing characters
        if (text[i + j] !== pattern[j]) {
          break;
        }
      }

      // if p == t and pattern[0...pLen-1] = text[i, i+1, ...i+pLen-1]
      if (j === pLen) {
        indices.push(i);
      }
    }

    // Calculate hash value for next window of text: Remove leading digit, add trailing digit
    if (i < tLen - pLen) {
      t = (d * (t - text.charCodeAt(i) * h) + text.charCodeAt(i + pLen)) % q;
      // We might get negative value of t, converting it to positive
      if (t < 0) {
        t = t + q;
      }
    }
  }

  const endTime = performance.now();

  return {
    indices,
    comparisons,
    timeTaken: endTime - startTime,
  };
};
