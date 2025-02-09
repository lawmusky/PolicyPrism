import { useState } from "react";
import { Calendar, AlertCircle, CheckCircle, Clock } from "lucide-react";

const stages = [
  {
    id: "draft",
    name: "Draft",
    description: "Initial drafting and stakeholder consultation",
  },
  {
    id: "introduction",
    name: "Introduction",
    description: "Formal introduction and first reading",
  },
  {
    id: "committee",
    name: "Committee",
    description: "Committee review and public hearings",
  },
  {
    id: "amendments",
    name: "Amendments",
    description: "Amendment period and revisions",
  },
  {
    id: "vote",
    name: "Final Vote",
    description: "Floor debate and final vote",
  },
  {
    id: "implementation",
    name: "Implementation",
    description: "Enactment and implementation period",
  },
];

export default function LegislativeTimeline({
  legislationList = [],
  legislation = null,
}) {
  const [selectedStage, setSelectedStage] = useState(null);

  // Function to determine stage status
  const getStageStatus = (stageId, stages = []) => {
    const stage = stages.find((s) => s.stage === stageId);
    if (!stage) return "upcoming";
    if (stage.completed) return "completed";
    if (stage.current) return "current";
    return "upcoming";
  };

  const renderTimeline = (legislationData) => (
    <div key={legislationData.id} className="timeline-item">
      <h4>{legislationData.title}</h4>
      <div className="timeline-stages">
        {stages.map((stage, index) => {
          const status = getStageStatus(stage.id, legislationData.stages || []);

          return (
            <div
              key={stage.id}
              className={`timeline-stage ${status}`}
              onClick={() =>
                setSelectedStage({ ...stage, legislation: legislationData })
              }
            >
              <div className="stage-connector">
                {index > 0 && <div className="connector-line" />}
                <div className="stage-node">
                  {status === "completed" && (
                    <CheckCircle className="w-5 h-5" />
                  )}
                  {status === "current" && <Clock className="w-5 h-5" />}
                  {status === "upcoming" && <AlertCircle className="w-5 h-5" />}
                </div>
                {index < stages.length - 1 && (
                  <div className="connector-line" />
                )}
              </div>

              <div className="stage-content">
                <h5 className="stage-name">{stage.name}</h5>
                {(legislationData.stages || [])
                  .find((s) => s.stage === stage.id)
                  ?.milestones?.map((milestone) => (
                    <div key={milestone.event} className="stage-milestone">
                      <Calendar className="w-4 h-4" />
                      <span>{milestone.event}</span>
                      <span className="milestone-date">{milestone.date}</span>
                    </div>
                  ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="legislative-timeline">
      <div className="timeline-header">
        <h3>
          {legislation
            ? "Legislative Progress"
            : "Unified Legislative Progress"}
        </h3>
        <div className="timeline-legend">
          <span className="legend-item">
            <CheckCircle className="w-4 h-4 text-green-500" />
            Completed
          </span>
          <span className="legend-item">
            <Clock className="w-4 h-4 text-blue-500" />
            In Progress
          </span>
          <span className="legend-item">
            <AlertCircle className="w-4 h-4 text-gray-300" />
            Upcoming
          </span>
        </div>
      </div>

      <div className="timeline-container">
        {legislation ? (
          renderTimeline(legislation)
        ) : Array.isArray(legislationList) && legislationList.length > 0 ? (
          legislationList.map(renderTimeline)
        ) : (
          <p>No legislation data available.</p>
        )}
      </div>

      {selectedStage && (
        <div className="stage-details">
          <h4>
            {selectedStage.name} - {selectedStage.legislation.title}
          </h4>
          <p>{selectedStage.description}</p>
          {(selectedStage.legislation.stages || [])
            .find((s) => s.stage === selectedStage.id)
            ?.milestones?.map((milestone) => (
              <div key={milestone.event} className="milestone-detail">
                <span className="milestone-event">{milestone.event}</span>
                <span className="milestone-date">{milestone.date}</span>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
