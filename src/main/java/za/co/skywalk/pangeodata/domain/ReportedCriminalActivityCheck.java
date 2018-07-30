package za.co.skywalk.pangeodata.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.util.Objects;

/**
 * A ReportedCriminalActivityCheck.
 */
@Document(collection = "reported_criminal_activity_check")
public class ReportedCriminalActivityCheck implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("reported_criminal_activity_record_found")
    private String reportedCriminalActivityRecordFound;

    @Field("reported_criminal_activity_verified_by")
    private String reportedCriminalActivityVerifiedBy;

    @Field("reported_criminal_activity_verified_date")
    private String reportedCriminalActivityVerifiedDate;

    @Field("reported_criminal_activity_remarks")
    private String reportedCriminalActivityRemarks;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getReportedCriminalActivityRecordFound() {
        return reportedCriminalActivityRecordFound;
    }

    public ReportedCriminalActivityCheck reportedCriminalActivityRecordFound(String reportedCriminalActivityRecordFound) {
        this.reportedCriminalActivityRecordFound = reportedCriminalActivityRecordFound;
        return this;
    }

    public void setReportedCriminalActivityRecordFound(String reportedCriminalActivityRecordFound) {
        this.reportedCriminalActivityRecordFound = reportedCriminalActivityRecordFound;
    }

    public String getReportedCriminalActivityVerifiedBy() {
        return reportedCriminalActivityVerifiedBy;
    }

    public ReportedCriminalActivityCheck reportedCriminalActivityVerifiedBy(String reportedCriminalActivityVerifiedBy) {
        this.reportedCriminalActivityVerifiedBy = reportedCriminalActivityVerifiedBy;
        return this;
    }

    public void setReportedCriminalActivityVerifiedBy(String reportedCriminalActivityVerifiedBy) {
        this.reportedCriminalActivityVerifiedBy = reportedCriminalActivityVerifiedBy;
    }

    public String getReportedCriminalActivityVerifiedDate() {
        return reportedCriminalActivityVerifiedDate;
    }

    public ReportedCriminalActivityCheck reportedCriminalActivityVerifiedDate(String reportedCriminalActivityVerifiedDate) {
        this.reportedCriminalActivityVerifiedDate = reportedCriminalActivityVerifiedDate;
        return this;
    }

    public void setReportedCriminalActivityVerifiedDate(String reportedCriminalActivityVerifiedDate) {
        this.reportedCriminalActivityVerifiedDate = reportedCriminalActivityVerifiedDate;
    }

    public String getReportedCriminalActivityRemarks() {
        return reportedCriminalActivityRemarks;
    }

    public ReportedCriminalActivityCheck reportedCriminalActivityRemarks(String reportedCriminalActivityRemarks) {
        this.reportedCriminalActivityRemarks = reportedCriminalActivityRemarks;
        return this;
    }

    public void setReportedCriminalActivityRemarks(String reportedCriminalActivityRemarks) {
        this.reportedCriminalActivityRemarks = reportedCriminalActivityRemarks;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        ReportedCriminalActivityCheck reportedCriminalActivityCheck = (ReportedCriminalActivityCheck) o;
        if (reportedCriminalActivityCheck.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), reportedCriminalActivityCheck.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ReportedCriminalActivityCheck{" +
            "id=" + getId() +
            ", reportedCriminalActivityRecordFound='" + getReportedCriminalActivityRecordFound() + "'" +
            ", reportedCriminalActivityVerifiedBy='" + getReportedCriminalActivityVerifiedBy() + "'" +
            ", reportedCriminalActivityVerifiedDate='" + getReportedCriminalActivityVerifiedDate() + "'" +
            ", reportedCriminalActivityRemarks='" + getReportedCriminalActivityRemarks() + "'" +
            "}";
    }
}
