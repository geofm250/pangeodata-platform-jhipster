package za.co.skywalk.pangeodata.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DirectorshipVerificationReport.
 */
@Document(collection = "directorship_verification_report")
public class DirectorshipVerificationReport implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("directorship_verified")
    private String directorshipVerified;

    @Field("directorship_findings")
    private String directorshipFindings;

    @Field("directorship_verified_by")
    private String directorshipVerifiedBy;

    @Field("directorship_verified_date")
    private String directorshipVerifiedDate;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDirectorshipVerified() {
        return directorshipVerified;
    }

    public DirectorshipVerificationReport directorshipVerified(String directorshipVerified) {
        this.directorshipVerified = directorshipVerified;
        return this;
    }

    public void setDirectorshipVerified(String directorshipVerified) {
        this.directorshipVerified = directorshipVerified;
    }

    public String getDirectorshipFindings() {
        return directorshipFindings;
    }

    public DirectorshipVerificationReport directorshipFindings(String directorshipFindings) {
        this.directorshipFindings = directorshipFindings;
        return this;
    }

    public void setDirectorshipFindings(String directorshipFindings) {
        this.directorshipFindings = directorshipFindings;
    }

    public String getDirectorshipVerifiedBy() {
        return directorshipVerifiedBy;
    }

    public DirectorshipVerificationReport directorshipVerifiedBy(String directorshipVerifiedBy) {
        this.directorshipVerifiedBy = directorshipVerifiedBy;
        return this;
    }

    public void setDirectorshipVerifiedBy(String directorshipVerifiedBy) {
        this.directorshipVerifiedBy = directorshipVerifiedBy;
    }

    public String getDirectorshipVerifiedDate() {
        return directorshipVerifiedDate;
    }

    public DirectorshipVerificationReport directorshipVerifiedDate(String directorshipVerifiedDate) {
        this.directorshipVerifiedDate = directorshipVerifiedDate;
        return this;
    }

    public void setDirectorshipVerifiedDate(String directorshipVerifiedDate) {
        this.directorshipVerifiedDate = directorshipVerifiedDate;
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
        DirectorshipVerificationReport directorshipVerificationReport = (DirectorshipVerificationReport) o;
        if (directorshipVerificationReport.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), directorshipVerificationReport.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DirectorshipVerificationReport{" +
            "id=" + getId() +
            ", directorshipVerified='" + getDirectorshipVerified() + "'" +
            ", directorshipFindings='" + getDirectorshipFindings() + "'" +
            ", directorshipVerifiedBy='" + getDirectorshipVerifiedBy() + "'" +
            ", directorshipVerifiedDate='" + getDirectorshipVerifiedDate() + "'" +
            "}";
    }
}
