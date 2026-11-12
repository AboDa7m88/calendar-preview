(function () {
  DEMO_CLIENTS.splice(0, DEMO_CLIENTS.length, "Acme Media", "Northwind", "Vertex Labs", "Globex", "Initech");

  window.demoData = function () {
    let nextId = 0;

    const ME = "Sarah Miller";

    const fromClient = (offset, time, status, topic, notes, who, company, type) => ({
      id: ++nextId,
      title: topic,
      topic,
      notes,
      date: demoDate(offset),
      time,
      status,
      type,
      requested_by: "user",
      user_name: who,
      company_name: company,
      client: company,
    });

    const fromAdmin = (offset, time, status, topic, notes, who, company, admin, type) => ({
      id: ++nextId,
      title: topic,
      topic,
      notes,
      date: demoDate(offset),
      time,
      status,
      type,
      requested_by: "admin",
      admin_name: admin,
      user_name: who,
      company_name: company,
      client: company,
    });

    return {
      appointments: [
        fromAdmin(-2, "10:00:00", "approved", "Onboarding Session", "", "Lina Park", "Acme Media", ME, "meeting"),
        fromAdmin(-1, "15:00:00", "approved", "Case Study Published", "", "Dana White", "Vertex Labs", ME, "publish"),

        fromAdmin(0, "09:30:00", "approved", "Kickoff Call", "", "Jane Cooper", "Acme Media", ME, "meeting"),
        fromAdmin(0, "11:00:00", "approved", "Newsletter Scheduled", "", "Tom Reed", "Globex", ME, "schedule"),
        fromAdmin(0, "14:00:00", "approved", "Discovery Phase", "", "Peter Lee", "Northwind", ME, "phase"),
        fromAdmin(0, "16:00:00", "approved", "Launch Post Live", "", "Sara Ahmed", "Globex", ME, "publish"),

        fromClient(1, "11:00:00", "pending", "Brand Voice Workshop", "Bring the latest style guide", "Dana White", "Vertex Labs", "meeting"),

        fromAdmin(2, "10:00:00", "approved", "Social Posts Scheduled", "", "Ana Torres", "Northwind", ME, "schedule"),
        fromClient(2, "14:00:00", "pending", "Press Release", "", "Mark Spencer", "Acme Media", "publish"),

        fromAdmin(4, "13:00:00", "approved", "Design Phase", "", "Lina Park", "Acme Media", ME, "phase"),

        fromClient(5, "12:00:00", "rejected", "Pricing Discussion", "Asked for a slot outside office hours", "Ravi Patel", "Initech", "meeting"),

        fromAdmin(7, "10:30:00", "approved", "Podcast Episode Live", "", "Omar Khalil", "Vertex Labs", ME, "publish"),
        fromAdmin(7, "15:00:00", "approved", "Blog Series Scheduled", "", "Sara Ahmed", "Globex", ME, "schedule"),

        fromClient(9, "11:30:00", "pending", "Quarterly Review", "", "Jane Cooper", "Acme Media", "meeting"),
      ],
    };
  };
})();