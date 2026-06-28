import {
  timeFormatter,
  cfiRangeSpliter,
  getParagraphCfi,
  compareCfi,
  clashCfiRange,
  debounce,
} from './commonUtil';

/**
 * Regression safety-net tests for the pure utility functions.
 * - describe/it/expect are provided globally (Vitest globals / Jest).
 * - getNodefromCfi and getSelectionPosition depend on the DOM / epubjs and are
 *   left to integration tests.
 */

describe('timeFormatter', () => {
  it('formats a Date as yyyy-m-d (no zero padding)', () => {
    // Use the (year, monthIndex, day) constructor to avoid timezone shifts
    const date = new Date(2024, 3, 21); // 2024-04-21
    expect(timeFormatter(date)).toBe('2024-4-21');
  });

  it('keeps two-digit month/day as-is', () => {
    const date = new Date(2023, 10, 15); // 2023-11-15
    expect(timeFormatter(date)).toBe('2023-11-15');
  });
});

describe('cfiRangeSpliter', () => {
  it('splits a CFIRange into startCfi / endCfi', () => {
    const range = 'epubcfi(/6/4!/4,/2/1:0,/2/1:5)';
    expect(cfiRangeSpliter(range)).toEqual({
      startCfi: 'epubcfi(/6/4!/4/2/1:0)',
      endCfi: 'epubcfi(/6/4!/4/2/1:5)',
    });
  });

  it('returns null for an invalid CFIRange without commas', () => {
    expect(cfiRangeSpliter('epubcfi(/6/4!/4/2/1:0)')).toBeNull();
  });
});

describe('getParagraphCfi', () => {
  it('extracts only the paragraph CFI (origin) from a CFIRange', () => {
    const range = 'epubcfi(/6/4!/4,/2/1:0,/2/1:5)';
    expect(getParagraphCfi(range)).toBe('epubcfi(/6/4!/4)');
  });

  it('returns undefined for an empty string', () => {
    expect(getParagraphCfi('')).toBeUndefined();
  });

  it('returns null for an invalid CFIRange', () => {
    expect(getParagraphCfi('epubcfi(/6/4!/4/2/1:0)')).toBeNull();
  });
});

describe('compareCfi', () => {
  it('returns 0 for identical CFIs', () => {
    const cfi = 'epubcfi(/6/4!/4/2/1:0)';
    expect(compareCfi(cfi, cfi)).toBe(0);
  });

  it('returns a negative number for an earlier CFI', () => {
    const a = 'epubcfi(/6/4!/4/2/1:0)';
    const b = 'epubcfi(/6/4!/4/2/1:5)';
    expect(compareCfi(a, b)).toBeLessThan(0);
    expect(compareCfi(b, a)).toBeGreaterThan(0);
  });
});

describe('clashCfiRange', () => {
  it('returns true for two overlapping CFIRanges', () => {
    const base = 'epubcfi(/6/4!/4,/2/1:0,/2/1:10)';
    const target = 'epubcfi(/6/4!/4,/2/1:5,/2/1:15)';
    expect(clashCfiRange(base, target)).toBe(true);
  });

  it('returns null when an invalid CFIRange is provided', () => {
    expect(clashCfiRange('invalid', 'epubcfi(/6/4!/4,/2/1:0,/2/1:5)')).toBeNull();
  });
});

describe('debounce', () => {
  it('runs only once for rapid consecutive calls', async () => {
    let count = 0;
    const fn = debounce(20, () => {
      count += 1;
    });

    fn();
    fn();
    fn();

    expect(count).toBe(0); // not yet executed
    await new Promise(resolve => setTimeout(resolve, 50));
    expect(count).toBe(1);
  });

  it('runs with the arguments of the last call', async () => {
    let received: number | null = null;
    const fn = debounce(20, (value: number) => {
      received = value;
    });

    fn(1);
    fn(2);
    fn(3);

    await new Promise(resolve => setTimeout(resolve, 50));
    expect(received).toBe(3);
  });
});
