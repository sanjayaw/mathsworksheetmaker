import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import type { StandardProblem } from '../../types';

interface WorksheetPDFProps {
  problems: StandardProblem[];
}

const styles = StyleSheet.create({
  page: {
    padding: 25,
    fontSize: 12,
    fontFamily: 'Helvetica',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  nameDate: {
    fontSize: 11,
    textAlign: 'center',
    marginBottom: 15,
  },
  grid: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  problemBox: {
    width: '18.5%',
    border: '1px solid black',
    padding: 6,
    marginBottom: 8,
    position: 'relative',
    height: 110,
  },
  badge: {
    position: 'absolute',
    top: 3,
    left: 3,
    backgroundColor: 'black',
    color: 'white',
    width: 18,
    height: 18,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 9,
    fontWeight: 'bold',
  },
  problemContent: {
    marginTop: 20,
    fontFamily: 'Courier',
  },
  numbersContainer: {
    alignItems: 'flex-end',
  },
  carryRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 1,
    minHeight: 14,
  },
  carryBox: {
    width: 12,
    height: 12,
    borderWidth: 1,
    borderColor: '#999',
    marginHorizontal: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  carryBoxEmpty: {
    width: 12,
    height: 12,
    borderWidth: 1,
    borderColor: '#999',
    borderStyle: 'dashed',
    marginHorizontal: 1,
  },
  carryDigit: {
    fontSize: 8,
    color: '#666',
  },
  carryPlaceholder: {
    width: 12,
    height: 12,
    marginHorizontal: 1,
  },
  numberRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  digit: {
    width: 14,
    fontSize: 14,
    textAlign: 'center',
  },
  multiplierRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 2,
  },
  timesSign: {
    fontSize: 14,
    marginRight: 2,
  },
  topLine: {
    height: 1,
    backgroundColor: 'black',
    marginTop: 2,
  },
  doubleLine: {
    position: 'absolute',
    bottom: 6,
    left: 6,
    right: 6,
  },
  doubleLineTop: {
    height: 1,
    backgroundColor: 'black',
    marginBottom: 3,
  },
  doubleLineBottom: {
    height: 1,
    backgroundColor: 'black',
  },
});

const CarryBoxes = ({ problem }: { problem: StandardProblem }) => {
  const { hintLevel, carries, multiplicand } = problem;
  const digitCount = String(multiplicand).length;

  // Carry boxes appear above all digits except the leftmost
  // For 3-digit number: 2 carry positions (above tens and hundreds)
  const carryPositions = digitCount - 1;

  if (hintLevel === 'none') {
    // No carry boxes, just empty space for student to write
    return (
      <View style={styles.carryRow}>
        {Array.from({ length: digitCount }, (_, i) => (
          <View key={i} style={styles.carryPlaceholder} />
        ))}
      </View>
    );
  }

  // Carries array is [carry_from_ones, carry_from_tens, ...]
  // We display them right-to-left above the digits
  // Position 0 (rightmost carry box) = above tens digit = carries[0]

  return (
    <View style={styles.carryRow}>
      {/* Empty space above leftmost digit (no carry goes there) */}
      <View style={styles.carryPlaceholder} />

      {/* Carry boxes for remaining positions, left to right */}
      {Array.from({ length: carryPositions }, (_, i) => {
        // i=0 is leftmost carry box, i=carryPositions-1 is rightmost
        // carries array: [ones→tens, tens→hundreds, ...]
        // Reverse the index to match visual position
        const carryIndex = carryPositions - 1 - i;
        const carryValue = carries[carryIndex] || 0;

        if (hintLevel === 'full') {
          // Show all carries
          return (
            <View key={i} style={styles.carryBox}>
              <Text style={styles.carryDigit}>{carryValue > 0 ? carryValue : ''}</Text>
            </View>
          );
        }

        if (hintLevel === 'partial') {
          // Show only the first (rightmost) carry
          if (carryIndex === 0 && carryValue > 0) {
            return (
              <View key={i} style={styles.carryBox}>
                <Text style={styles.carryDigit}>{carryValue}</Text>
              </View>
            );
          }
          return <View key={i} style={styles.carryBoxEmpty} />;
        }

        // hintLevel === 'structure': empty boxes
        return <View key={i} style={styles.carryBoxEmpty} />;
      })}
    </View>
  );
};

const ProblemBox = ({ problem }: { problem: StandardProblem }) => {
  const multiplicandDigits = String(problem.multiplicand).split('');

  return (
    <View style={styles.problemBox}>
      <View style={styles.badge}>
        <Text>{problem.number}</Text>
      </View>

      <View style={styles.problemContent}>
        <View style={styles.numbersContainer}>
          {/* Carry boxes row */}
          <CarryBoxes problem={problem} />

          {/* Multiplicand row */}
          <View style={styles.numberRow}>
            {multiplicandDigits.map((digit, i) => (
              <Text key={i} style={styles.digit}>{digit}</Text>
            ))}
          </View>

          {/* Multiplier row with × sign */}
          <View style={styles.multiplierRow}>
            <Text style={styles.timesSign}>×</Text>
            <Text style={styles.digit}>{problem.multiplier}</Text>
          </View>
        </View>

        {/* Single line separating question from answer area */}
        <View style={styles.topLine} />
      </View>

      {/* Double line at bottom for final answer - positioned absolutely */}
      <View style={styles.doubleLine}>
        <View style={styles.doubleLineTop} />
        <View style={styles.doubleLineBottom} />
      </View>
    </View>
  );
};

export const WorksheetPDF = ({ problems }: WorksheetPDFProps) => {
  const pageCount = Math.ceil(problems.length / 20);

  return (
    <Document>
      {Array.from({ length: pageCount }, (_, pageIndex) => {
        const pageProblems = problems.slice(pageIndex * 20, (pageIndex + 1) * 20);
        return (
          <Page key={pageIndex} size="A4" style={styles.page}>
            <Text style={styles.title}>
              Multiplication Practice{pageIndex > 0 ? ' (continued)' : ''}
            </Text>
            <Text style={styles.nameDate}>
              Name: _______________    Date: _______________
            </Text>

            <View style={styles.grid}>
              {pageProblems.map((problem) => (
                <ProblemBox key={problem.number} problem={problem} />
              ))}
            </View>
          </Page>
        );
      })}
    </Document>
  );
};
