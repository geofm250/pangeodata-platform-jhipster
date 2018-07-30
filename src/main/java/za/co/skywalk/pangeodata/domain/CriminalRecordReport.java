package za.co.skywalk.pangeodata.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.util.Objects;

/**
 * A CriminalRecordReport.
 */
@Document(collection = "criminal_record_report")
public class CriminalRecordReport implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("record_found")
    private String recordFound;

    @Field("offences")
    private String offences;

    @Field("verified_by")
    private String verifiedBy;

    @Field("verified_date")
    private String verifiedDate;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getRecordFound() {
        return recordFound;
    }

    public CriminalRecordReport recordFound(String recordFound) {
        this.recordFound = recordFound;
        return this;
    }

    public void setRecordFound(String recordFound) {
        this.recordFound = recordFound;
    }

    public String getOffences() {
        return offences;
    }

    public CriminalRecordReport offences(String offences) {
        this.offences = offences;
        return this;
    }

    public void setOffences(String offences) {
        this.offences = offences;
    }

    public String getVerifiedBy() {
        return verifiedBy;
    }

    public CriminalRecordReport verifiedBy(String verifiedBy) {
        this.verifiedBy = verifiedBy;
        return this;
    }

    public void setVerifiedBy(String verifiedBy) {
        this.verifiedBy = verifiedBy;
    }

    public String getVerifiedDate() {
        return verifiedDate;
    }

    public CriminalRecordReport verifiedDate(String verifiedDate) {
        this.verifiedDate = verifiedDate;
        return this;
    }

    public void setVerifiedDate(String verifiedDate) {
        this.verifiedDate = verifiedDate;
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
        CriminalRecordReport criminalRecordReport = (CriminalRecordReport) o;
        if (criminalRecordReport.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), criminalRecordReport.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CriminalRecordReport{" +
            "id=" + getId() +
            ", recordFound='" + getRecordFound() + "'" +
            ", offences='" + getOffences() + "'" +
            ", verifiedBy='" + getVerifiedBy() + "'" +
            ", verifiedDate='" + getVerifiedDate() + "'" +
            "}";
    }
}
