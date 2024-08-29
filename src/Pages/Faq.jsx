import FAQentry from "../Components/FAQentry";

function Faq() {
  const faqs = [
    {
      question: "What is the purpose of this website?",
      answer: "The purpose of this website is to provide a platform for users to manage their tasks and projects.",
    },
    {
      question: "What are the different user roles in SnapTask?",
      answer: `There are three different user roles in SnapTask: Admin, Manager, and Staff. Admin: Has the highest level of access. 
        Admins can create and manage other users, areas, and tasks, and have access to all reports and statistics.
        Manager is similar to Admin but with slightly fewer permissions.
        Managers can also create users, areas, and tasks, and manage task assignments.
        Staff is assigned specific tasks in designated areas. They can view and work on tasks assigned to them and see their progress status.
        `,
    },
    {
      question: "How do I create a new user?",
      answer: `Admins and Managers can create new users by navigating to the user management section in the dashboard. 
      Fill in the required details such as the user’s role and area assignment, and then save the changes.
        `,
    },
    {
      question: "How do I create and assign tasks?",
      answer: `Admins and Managers can create tasks by accessing the task management section. 
      Specify the details of the task, choose the relevant area, and assign it to a staff member. 
      The assigned staff will then see the task in their dashboard.
        `,
    },
    {
      question: "What are the different task statuses?",
      answer: `New: The task has been created but not yet started. 
      In Progress: The task is currently being worked on.
      Finished: The task has been completed.`,
    },
    {
      question: "How do staff members access their tasks?",
      answer: `Staff members will be redirected to their specific area upon logging in. 
      They can view and select tasks assigned to them from the list in their area.`,
    },
    {
      question: "Can staff members see tasks assigned to other staff?",
      answer: `No, staff members can only see tasks that are specifically assigned to them.`,
    },
    {
      question: "How does the QR code feature work?",
      answer: `Admins can generate QR codes for specific tasks and place them at relevant locations. 
      When staff members scan the QR code using their mobile device, they will be redirected to the task page on the SnapTask website,
      where they can view and work on the task.`,
    },
    {
      question: "How can I view performance and activity reports?",
      answer: `Admins can access performance and activity reports through the dashboard. 
      The reports section provides insights into user activity, task progress, and overall performance.`,
    },
    {
      question: "Can I print a QR code for a task?",
      answer: `Yes, admins can generate and print QR codes for specific tasks. 
      This feature is useful for directing staff to tasks at specific locations easily.`,
    },
    {
      question: "What should I do if I forget my password?",
      answer: `Click on the "Forgot Password" link on the login page. 
      Follow the instructions to reset your password using the email associated with your account.`,
    },
    {
      question: "How do I change user roles or permissions?",
      answer: `Admins can change user roles and permissions by navigating to the user management section of the dashboard, 
      selecting the user, and modifying their role or permissions as needed.`,
    },
    {
      question: "Can I assign a task to multiple staff members?",
      answer: `Currently, tasks can only be assigned to one staff member at a time. 
      If you need to assign the same task to multiple staff members, you'll need to create separate tasks for each.`,
    },
    {
      question: "Is there a way to track task progress in real-time?",
      answer: `Yes, you can track task progress in real-time through the task management section of the dashboard. 
      Updates will be reflected as staff members change the task status.`,
    },
    {
      question: "Who can I contact for support?",
      answer: `For support, please contact our support team through the "Help" or "Contact Us" section on the website. 
      Provide details about your issue, and we’ll assist you as quickly as possible.`,
    },
  ];

  return (
    <div className="min-h-screen py-12 w-full px-4">
      <p className="text-3xl">Frequently Asked Questions</p>
      <div className="flex flex-col gap-4 my-8 w-full text-left">
        {faqs.map((faq, index) => (
          <FAQentry key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </div>
  );
}

export default Faq;
