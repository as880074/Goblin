import { WantedPoster, GoblinType } from '@/entities/goblin/ui/wanted-poster';
import { notFound } from 'next/navigation';

const VALID_TYPES = [
  'ISFP', 'ENTP', 'ESTJ', 'ISTJ', 
  'ESFP', 'ENTJ', 'ENFJ', 'INTP', 
  'INTJ', 'INFP', 'ISTP', 'INFJ', 
  'ENFP', 'ESFJ', 'ESTP', 'ISFJ'
];

export default function GoblinResultPage({ params }: { params: { type: string } }) {
  const { type } = params;

  if (!VALID_TYPES.includes(type.toUpperCase())) {
    return notFound();
  }

  return (
    <main className="min-h-screen bg-black">
      <WantedPoster type={type.toUpperCase() as GoblinType} />
    </main>
  );
}
