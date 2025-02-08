import PreviousConversation from './PreviousConversation';

function PreviousConversationsGrouped({ data, date }: { data: any; date: string }) {
  return (
    data?.length > 0 && (
      <div>
        <div className="py-4 ">
          <p className=" px-6 font-bold  text-[#000] mb-2">{date}</p>
          {data?.map((cur: any, i:any): any => (
            <PreviousConversation key={i} data={cur} />
          ))}
        </div>
      </div>
    )
  );
}
export default PreviousConversationsGrouped;
