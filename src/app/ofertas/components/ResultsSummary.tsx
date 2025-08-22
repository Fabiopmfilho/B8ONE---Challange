type ResultsSummaryProps = {
  startIndex: number;
  endIndex: number;
  totalItems: number;
};

const ResultsSummary = ({
  startIndex,
  endIndex,
  totalItems,
}: ResultsSummaryProps) => {
  return (
    <div className="text-sm text-gray-600">
      <p>
        Mostrando {totalItems > 0 ? startIndex + 1 : 0} -{" "}
        {Math.min(endIndex, totalItems)} de {totalItems} produtos
      </p>
    </div>
  );
};

export default ResultsSummary;
