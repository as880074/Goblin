import { WantedPoster, GoblinType } from '@/entities/goblin/ui/wanted-poster';
import { notFound } from 'next/navigation';

const VALID_TYPES = [
  'ISFP', 'ENTP', 'ESTJ', 'ISTJ', 
  'ESFP', 'ENTJ', 'ENFJ', 'INTP', 
  'INTJ', 'INFP', 'ISTP', 'INFJ', 
  'ENFP', 'ESFJ', 'ESTP', 'ISFJ'
];

export function generateStaticParams() {
  return VALID_TYPES.map((type) => ({ type: type.toLowerCase() }));
}

export default async function GoblinResultPage({ params }: { params: Promise<{ type: string }> }) {
  const { type } = await params;

  if (!VALID_TYPES.includes(type.toUpperCase())) {
    return notFound();
  }

  return (
    <main className="min-h-screen bg-black">
      <WantedPoster type={type.toUpperCase() as GoblinType} />
    </main>
  );
}
