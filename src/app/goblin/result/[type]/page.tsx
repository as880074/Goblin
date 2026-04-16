import type { Metadata } from 'next';
import { GoblinType } from '@/entities/goblin/ui/wanted-poster';
import { GOBLIN_REGISTRY, VALID_TYPES } from '@/entities/goblin/model/registry';
import { notFound } from 'next/navigation';
import { GoblinResultClient } from './client';

export function generateStaticParams() {
  return VALID_TYPES.map((type) => ({ type: type.toLowerCase() }));
}

export async function generateMetadata({ params }: { params: Promise<{ type: string }> }): Promise<Metadata> {
  const { type } = await params;
  const upper = type.toUpperCase() as GoblinType;
  const goblin = GOBLIN_REGISTRY[upper];
  if (!goblin) return {};

  const title = `WANTED: ${goblin.name} (${upper}) — G-MBTI 戀愛地下城`;
  const description = `你的戀愛哥布林型態是「${goblin.name}」！${goblin.description}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [`/assets/goblins/${type.toLowerCase()}.png`],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function GoblinResultPage({ params }: { params: Promise<{ type: string }> }) {
  const { type } = await params;

  if (!VALID_TYPES.includes(type.toUpperCase() as GoblinType)) {
    return notFound();
  }

  return <GoblinResultClient type={type.toUpperCase() as GoblinType} />;
}
