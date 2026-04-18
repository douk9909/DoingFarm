interface DashboardDetailPageProps {
  params: Promise<{
    dashboardId: string;
  }>;
}

export default async function DashboardDetailPage({
  params,
}: DashboardDetailPageProps) {
  const { dashboardId } = await params;

  return (
    <section>
      <h1>대시보드 상세</h1>
      <p>dashboardId: {dashboardId}</p>
    </section>
  );
}