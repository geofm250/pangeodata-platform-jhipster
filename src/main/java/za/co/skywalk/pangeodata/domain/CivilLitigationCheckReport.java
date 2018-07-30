package za.co.skywalk.pangeodata.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.util.Objects;

/**
 * A CivilLitigationCheckReport.
 */
@Document(collection = "civil_litigation_check_report")
public class CivilLitigationCheckReport implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("civil_record_found")
    private String civilRecordFound;

    @Field("civil_findings")
    private String civilFindings;

    @Field("civil_verified_by")
    private String civilVerifiedBy;

    @Field("civil_verified_date")
    private String civilVerifiedDate;

    @Field("civil_remarks")
    private String civilRemarks;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCivilRecordFound() {
        return civilRecordFound;
    }

    public CivilLitigationCheckReport civilRecordFound(String civilRecordFound) {
        this.civilRecordFound = civilRecordFound;
        return this;
    }

    public void setCivilRecordFound(String civilRecordFound) {
        this.civilRecordFound = civilRecordFound;
    }

    public String getCivilFindings() {
        return civilFindings;
    }

    public CivilLitigationCheckReport civilFindings(String civilFindings) {
        this.civilFindings = civilFindings;
        return this;
    }

    public void setCivilFindings(String civilFindings) {
        this.civilFindings = civilFindings;
    }

    public String getCivilVerifiedBy() {
        return civilVerifiedBy;
    }

    public CivilLitigationCheckReport civilVerifiedBy(String civilVerifiedBy) {
        this.civilVerifiedBy = civilVerifiedBy;
        return this;
    }

    public void setCivilVerifiedBy(String civilVerifiedBy) {
        this.civilVerifiedBy = civilVerifiedBy;
    }

    public String getCivilVerifiedDate() {
        return civilVerifiedDate;
    }

    public CivilLitigationCheckReport civilVerifiedDate(String civilVerifiedDate) {
        this.civilVerifiedDate = civilVerifiedDate;
        return this;
    }

    public void setCivilVerifiedDate(String civilVerifiedDate) {
        this.civilVerifiedDate = civilVerifiedDate;
    }

    public String getCivilRemarks() {
        return civilRemarks;
    }

    public CivilLitigationCheckReport civilRemarks(String civilRemarks) {
        this.civilRemarks = civilRemarks;
        return this;
    }

    public void setCivilRemarks(String civilRemarks) {
        this.civilRemarks = civilRemarks;
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
        CivilLitigationCheckReport civilLitigationCheckReport = (CivilLitigationCheckReport) o;
        if (civilLitigationCheckReport.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), civilLitigationCheckReport.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CivilLitigationCheckReport{" +
            "id=" + getId() +
            ", civilRecordFound='" + getCivilRecordFound() + "'" +
            ", civilFindings='" + getCivilFindings() + "'" +
            ", civilVerifiedBy='" + getCivilVerifiedBy() + "'" +
            ", civilVerifiedDate='" + getCivilVerifiedDate() + "'" +
            ", civilRemarks='" + getCivilRemarks() + "'" +
            "}";
    }
}
