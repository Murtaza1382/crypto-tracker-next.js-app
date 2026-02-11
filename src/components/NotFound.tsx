interface Props {
  message?: string;
}

export default function NotFound({ message }: Props) {
  return (
    <div className="flex justify-center items-center py-10">
      <p className="text-red-500 text-lg">{message || "No data found"}</p>
    </div>
  );
}
