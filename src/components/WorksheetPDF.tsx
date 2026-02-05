import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import type { Problem } from '../types';

interface WorksheetPDFProps {
  problems: Problem[];
}

// Create styles
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
    width: '18.5%', // 5 columns with spacing
    border: '1px solid black',
    padding: 6,
    marginBottom: 8,
    position: 'relative',
    minHeight: 100,
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
    marginTop: 22,
    fontFamily: 'Courier',
  },
  problemRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  multiplicand: {
    fontSize: 13,
    marginBottom: 1,
    textAlign: 'right',
  },
  multiplier: {
    fontSize: 13,
    marginBottom: 2,
    textAlign: 'right',
  },
  topLine: {
    borderTop: '1px solid black',
    marginTop: 2,
    marginBottom: 3,
  },
  partialProductRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    minHeight: 12,
    marginBottom: 1,
  },
  plusSign: {
    fontSize: 11,
    marginRight: 3,
    width: 8,
  },
  partialProduct: {
    fontSize: 11,
    textAlign: 'right',
    flex: 1,
  },
  blankLine: {
    fontSize: 11,
    textAlign: 'right',
    flex: 1,
  },
  bottomLine: {
    borderTop: '1px solid black',
    marginTop: 3,
    marginBottom: 2,
  },
  answerLine: {
    fontSize: 10,
    textAlign: 'left',
  },
});

// Helper component to render hints based on hintLevel
const ProblemHints = ({ problem }: { problem: Problem }) => {
  const { hintLevel, partialProducts, multiplicand } = problem;
  const minRows = String(multiplicand).length;
  const rowCount = Math.max(partialProducts.length, minRows);

  if (hintLevel === 'full') {
    // Show ALL partial products with values, pad with empty rows if needed
    const extraRows = rowCount - partialProducts.length;
    return (
      <>
        {partialProducts.map((product, index) => (
          <View key={index} style={styles.partialProductRow}>
            <Text style={styles.plusSign}>{index > 0 ? '+' : ' '}</Text>
            <Text style={styles.partialProduct}>{product}</Text>
          </View>
        ))}
        {Array.from({ length: extraRows }, (_, index) => (
          <View key={`extra-${index}`} style={styles.partialProductRow}>
            <Text style={styles.plusSign}> </Text>
            <Text style={styles.blankLine}> </Text>
          </View>
        ))}
        <View style={styles.bottomLine} />
        <Text style={styles.answerLine}>=</Text>
      </>
    );
  }

  if (hintLevel === 'partial') {
    // Show first partial product, then blank lines up to rowCount
    return (
      <>
        <View style={styles.partialProductRow}>
          <Text style={styles.plusSign}> </Text>
          <Text style={styles.partialProduct}>{partialProducts[0]}</Text>
        </View>
        {Array.from({ length: rowCount - 1 }, (_, index) => (
          <View key={index} style={styles.partialProductRow}>
            <Text style={styles.plusSign}>+</Text>
            <Text style={styles.blankLine}>________</Text>
          </View>
        ))}
        <View style={styles.bottomLine} />
        <Text style={styles.answerLine}>=</Text>
      </>
    );
  }

  if (hintLevel === 'structure') {
    // Show blank lines with "+" for partial products, then extra blank lines (no "+") up to rowCount
    const extraRows = rowCount - partialProducts.length;
    return (
      <>
        {partialProducts.map((_, index) => (
          <View key={index} style={styles.partialProductRow}>
            <Text style={styles.plusSign}>{index > 0 ? '+' : ' '}</Text>
            <Text style={styles.blankLine}>________</Text>
          </View>
        ))}
        {Array.from({ length: extraRows }, (_, index) => (
          <View key={`extra-${index}`} style={styles.partialProductRow}>
            <Text style={styles.plusSign}> </Text>
            <Text style={styles.blankLine}>________</Text>
          </View>
        ))}
        <View style={styles.bottomLine} />
        <Text style={styles.answerLine}>=</Text>
      </>
    );
  }

  // hintLevel === 'none': Show rowCount grey working lines with invisible "+"
  return (
    <>
      {Array.from({ length: rowCount }, (_, index) => (
        <View key={index} style={styles.partialProductRow}>
          <Text style={{ ...styles.plusSign, color: 'white' }}>{index > 0 ? '+' : ' '}</Text>
          <Text style={{ ...styles.blankLine, color: '#CCCCCC' }}>________</Text>
        </View>
      ))}
      <View style={styles.bottomLine} />
      <Text style={styles.answerLine}>=</Text>
    </>
  );
};

// Individual problem box component
const ProblemBox = ({ problem }: { problem: Problem }) => (
  <View style={styles.problemBox}>
    <View style={styles.badge}>
      <Text>{problem.number}</Text>
    </View>
    
    <View style={styles.problemContent}>
      <Text style={styles.multiplicand}>{problem.multiplicand}</Text>
      <Text style={styles.multiplier}>× {problem.multiplier}</Text>
      <View style={styles.topLine} />
      
      <ProblemHints problem={problem} />
    </View>
  </View>
);

// Main PDF component
export const WorksheetPDF = ({ problems }: WorksheetPDFProps) => {
  return (
    <Document>
      {[0, 1, 2, 3].map((pageIndex) => {
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
