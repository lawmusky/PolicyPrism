// components/Activity/ActivityTab.js
import { Plus, Calendar, FileText, Users, MessageCircle } from "lucide-react";

const mockActivities = [
  {
    id: 1,
    type: "Meeting",
    title: "Quarterly Policy Roundtable",
    date: "2025-02-05",
    description: "Discussion on upcoming data privacy regulations",
    participants: ["Sarah Chen", "John Smith", "Emma Wilson"],
    status: "Completed",
  },
  {
    id: 2,
    type: "Position Statement",
    title: "AI Governance Framework Response",
    date: "2025-02-03",
    description: "Published position paper on proposed AI regulations",
    impact: "High",
    status: "Published",
  },
  {
    id: 3,
    type: "Engagement",
    title: "Stakeholder Consultation",
    date: "2025-02-01",
    description: "Meeting with regulatory body representatives",
    participants: ["Tech Industry Association", "Regulatory Affairs"],
    status: "Scheduled",
  },
];

export default function ActivityTab() {
  return (
    <div className="activity-tab">
      <div className="tab-header">
        <h2>Activity Timeline</h2>
        <button className="add-button">
          <Plus size={16} />
          Log Activity
        </button>
      </div>

      <div className="activity-timeline">
        {mockActivities.map((activity) => (
          <div key={activity.id} className="timeline-item">
            <div className="timeline-marker">
              {activity.type === "Meeting" ? (
                <Users size={16} />
              ) : activity.type === "Position Statement" ? (
                <FileText size={16} />
              ) : (
                <MessageCircle size={16} />
              )}
            </div>
            <div className="timeline-content">
              <div className="timeline-header">
                <h3>{activity.title}</h3>
                <span className="activity-date">
                  <Calendar size={14} />
                  {activity.date}
                </span>
              </div>
              <p className="activity-description">{activity.description}</p>
              {activity.participants && (
                <div className="activity-participants">
                  <span>Participants:</span>
                  {activity.participants.map((participant, index) => (
                    <span key={index} className="participant-tag">
                      {participant}
                    </span>
                  ))}
                </div>
              )}
              <div className="activity-footer">
                <span
                  className={`status-badge ${activity.status.toLowerCase()}`}
                >
                  {activity.status}
                </span>
                {activity.impact && (
                  <span
                    className={`impact-badge ${activity.impact.toLowerCase()}`}
                  >
                    Impact: {activity.impact}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
