interface DashboardEditPageProps {
  params: Promise<{
    dashboardId: string;
  }>;
}

export default async function DashboardEditPage({ params }: DashboardEditPageProps) {
  const { dashboardId } = await params;

  return (
    <section>
      <h1>대시보드 수정</h1>
      <p>dashboardId: {dashboardId}</p>
    </section>
  );
}