package za.co.skywalk.pangeodata.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.util.Objects;

/**
 * A PoliticallyExposedPersonsCheckReport.
 */
@Document(collection = "politically_exposed_persons_check_report")
public class PoliticallyExposedPersonsCheckReport implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("pep_identified")
    private String pepIdentified;

    @Field("pep_verified_by")
    private String pepVerifiedBy;

    @Field("pep_verified_date")
    private String pepVerifiedDate;

    @Field("pep_remarks")
    private String pepRemarks;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPepIdentified() {
        return pepIdentified;
    }

    public PoliticallyExposedPersonsCheckReport pepIdentified(String pepIdentified) {
        this.pepIdentified = pepIdentified;
        return this;
    }

    public void setPepIdentified(String pepIdentified) {
        this.pepIdentified = pepIdentified;
    }

    public String getPepVerifiedBy() {
        return pepVerifiedBy;
    }

    public PoliticallyExposedPersonsCheckReport pepVerifiedBy(String pepVerifiedBy) {
        this.pepVerifiedBy = pepVerifiedBy;
        return this;
    }

    public void setPepVerifiedBy(String pepVerifiedBy) {
        this.pepVerifiedBy = pepVerifiedBy;
    }

    public String getPepVerifiedDate() {
        return pepVerifiedDate;
    }

    public PoliticallyExposedPersonsCheckReport pepVerifiedDate(String pepVerifiedDate) {
        this.pepVerifiedDate = pepVerifiedDate;
        return this;
    }

    public void setPepVerifiedDate(String pepVerifiedDate) {
        this.pepVerifiedDate = pepVerifiedDate;
    }

    public String getPepRemarks() {
        return pepRemarks;
    }

    public PoliticallyExposedPersonsCheckReport pepRemarks(String pepRemarks) {
        this.pepRemarks = pepRemarks;
        return this;
    }

    public void setPepRemarks(String pepRemarks) {
        this.pepRemarks = pepRemarks;
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
        PoliticallyExposedPersonsCheckReport politicallyExposedPersonsCheckReport = (PoliticallyExposedPersonsCheckReport) o;
        if (politicallyExposedPersonsCheckReport.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), politicallyExposedPersonsCheckReport.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PoliticallyExposedPersonsCheckReport{" +
            "id=" + getId() +
            ", pepIdentified='" + getPepIdentified() + "'" +
            ", pepVerifiedBy='" + getPepVerifiedBy() + "'" +
            ", pepVerifiedDate='" + getPepVerifiedDate() + "'" +
            ", pepRemarks='" + getPepRemarks() + "'" +
            "}";
    }
}
