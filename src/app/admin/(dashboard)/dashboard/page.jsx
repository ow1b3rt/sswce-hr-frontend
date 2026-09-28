"use client";

import { useGet } from "@/packages/admin";

import Badge from "@/components/molecules/Badge";
import DashboardCard from "@/components/molecules/dashboard/DashboardCard";
import DashboardCardSkeleton from "@/components/molecules/dashboard/DashboardCardSkeleton";
import DashboardListItem from "@/components/molecules/dashboard/DashboardListItem";
import EventDateBadge from "@/components/molecules/EventDateBadge";

export default function Dashboard() {
  const { data, isLoading } = useGet(`/dashboard/summary`);
  return (
    <main className="flex flex-col gap-4">
      <h1 className="text-primary-green-dark text-4xl font-semibold">Dashboard</h1>
      <section className="grid gap-4 space-y-8 lg:grid-cols-2 2xl:grid-cols-3">
        {isLoading ? (
          <>
            <DashboardCardSkeleton />
            <DashboardCardSkeleton />
            <DashboardCardSkeleton />
            <DashboardCardSkeleton />
            <DashboardCardSkeleton />
            <DashboardCardSkeleton />
          </>
        ) : (
          <>
            {data?.summary?.totalAppointments > 0 && (
              <DashboardCard
                icon="/icons/calendar.png"
                title="Recent Appointments"
                count={data?.summary?.totalAppointments}
                viewAllHref="/admin/appointments"
              >
                {data?.summary?.recentAppointments.map((appointment) => (
                  <DashboardListItem
                    key={appointment.id}
                    href={`/admin/appointments/${appointment.id}`}
                  >
                    <div className="flex flex-col gap-1">
                      <p className="text-base font-medium">
                        {appointment.firstName} {appointment.lastName}
                      </p>
                      <p className="text-text-color text-sm">For: {appointment.purpose}</p>
                    </div>
                    <Badge className="w-fit! text-sm!" value={appointment.status} />
                  </DashboardListItem>
                ))}
              </DashboardCard>
            )}
            {data?.summary?.upcomingEventsCount > 0 && (
              <DashboardCard
                icon="/icons/party.png"
                title="Upcoming Events"
                count={data?.summary?.upcomingEventsCount}
                viewAllHref="/admin/events"
              >
                {data?.summary?.upcomingEvents.map((event) => (
                  <DashboardListItem key={event.id} href={`/admin/events/${event.id}`}>
                    <div className="flex items-center gap-2">
                      <EventDateBadge time={event.time} />
                      <div>
                        <p className="text-base font-medium">{event.title}</p>
                        <p className="text-text-color max-w-72 truncate text-sm">
                          {event.description}
                        </p>
                      </div>
                    </div>
                  </DashboardListItem>
                ))}
              </DashboardCard>
            )}
            {data?.summary?.totalNotices > 0 && (
              <DashboardCard
                icon="/icons/notificaiton.png"
                title="Notices"
                count={data?.summary?.totalNotices}
                viewAllHref="/admin/notices"
              >
                {data?.summary?.recentNotices.map((notice) => (
                  <DashboardListItem key={notice.id} href={`/admin/notices/${notice.id}`}>
                    <div className="flex flex-col gap-1">
                      <p className="text-base font-medium">{notice.title}</p>
                      <p className="text-text-color max-w-72 truncate text-sm">
                        {notice.description}
                      </p>
                    </div>
                  </DashboardListItem>
                ))}
              </DashboardCard>
            )}
            {data?.summary?.totalContacts > 0 && (
              <DashboardCard
                icon="/icons/faq.png"
                title="Contacts"
                count={data?.summary?.totalContacts}
                viewAllHref="/admin/contact"
              >
                {data?.summary?.recentContacts.map((contact) => (
                  <DashboardListItem key={contact.id} href={`/admin/contact/${contact.id}`}>
                    <div className="flex flex-col gap-1">
                      <p className="text-base font-medium">{contact.subject}</p>
                      <p className="text-text-color max-w-72 truncate text-sm">
                        Message: {contact.message}
                      </p>
                      <p className="text-primary-green-dark max-w-72 truncate text-xs font-semibold">
                        From: {contact.name}
                      </p>
                    </div>
                  </DashboardListItem>
                ))}
              </DashboardCard>
            )}
            {data?.summary?.totalSuccessProfiles > 0 && (
              <DashboardCard
                icon="/icons/goal.png"
                title="Success Stories"
                count={data?.summary?.totalSuccessProfiles}
                viewAllHref="/admin/success"
              >
                {data?.summary?.recentSuccessProfiles.map((story) => (
                  <DashboardListItem key={story.id} href={`/admin/success/${story.id}`}>
                    <div className="flex flex-col gap-1">
                      <p className="text-text-color max-w-72 truncate text-sm">
                        {story.description}
                      </p>
                      <p className="text-primary-green-dark max-w-72 truncate text-xs font-semibold">
                        By: {story.name}
                      </p>
                    </div>
                  </DashboardListItem>
                ))}
              </DashboardCard>
            )}
            {data?.summary?.totalTestimonials > 0 && (
              <DashboardCard
                icon="/icons/testimonial.png"
                title="Testimonials"
                count={data?.summary?.totalTestimonials}
                viewAllHref="/admin/testimonials"
              >
                {data?.summary?.recentTestimonials.map((story) => (
                  <DashboardListItem key={story.id} href={`/admin/testimonials/${story.id}`}>
                    <div className="flex flex-col gap-1">
                      <p className="text-base font-medium">{story.title}</p>
                      <p className="text-text-color max-w-72 truncate text-sm">
                        {story.description}
                      </p>
                      <p className="text-primary-green-dark max-w-72 truncate text-xs font-semibold">
                        By: {story.name}
                      </p>
                    </div>
                  </DashboardListItem>
                ))}
              </DashboardCard>
            )}
          </>
        )}
      </section>
    </main>
  );
}
