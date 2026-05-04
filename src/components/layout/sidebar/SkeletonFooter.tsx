import base from '@/components/common/Skeleton/Skeleton.module.css';

export default function SkeletonFooter() {
  const skeleton = base.skeletonBase;

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        <div className={`${skeleton} ${base.avatar}`} />
        <div className={`${skeleton}`} style={{ width: '60px', height: ' 30px' }} />
      </div>
      <div className={`${skeleton}`} style={{ width: '30px', height: '30px' }} />
    </div>
  );
}
