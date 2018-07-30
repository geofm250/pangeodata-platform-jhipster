package za.co.skywalk.pangeodata.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.util.Objects;

/**
 * A SocialMediaCheckReport.
 */
@Document(collection = "social_media_check_report")
public class SocialMediaCheckReport implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("social_media_sources_checked")
    private String socialMediaSourcesChecked;

    @Field("social_media_findings")
    private String socialMediaFindings;

    @Field("social_media_verified_date")
    private String socialMediaVerifiedDate;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getSocialMediaSourcesChecked() {
        return socialMediaSourcesChecked;
    }

    public SocialMediaCheckReport socialMediaSourcesChecked(String socialMediaSourcesChecked) {
        this.socialMediaSourcesChecked = socialMediaSourcesChecked;
        return this;
    }

    public void setSocialMediaSourcesChecked(String socialMediaSourcesChecked) {
        this.socialMediaSourcesChecked = socialMediaSourcesChecked;
    }

    public String getSocialMediaFindings() {
        return socialMediaFindings;
    }

    public SocialMediaCheckReport socialMediaFindings(String socialMediaFindings) {
        this.socialMediaFindings = socialMediaFindings;
        return this;
    }

    public void setSocialMediaFindings(String socialMediaFindings) {
        this.socialMediaFindings = socialMediaFindings;
    }

    public String getSocialMediaVerifiedDate() {
        return socialMediaVerifiedDate;
    }

    public SocialMediaCheckReport socialMediaVerifiedDate(String socialMediaVerifiedDate) {
        this.socialMediaVerifiedDate = socialMediaVerifiedDate;
        return this;
    }

    public void setSocialMediaVerifiedDate(String socialMediaVerifiedDate) {
        this.socialMediaVerifiedDate = socialMediaVerifiedDate;
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
        SocialMediaCheckReport socialMediaCheckReport = (SocialMediaCheckReport) o;
        if (socialMediaCheckReport.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), socialMediaCheckReport.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SocialMediaCheckReport{" +
            "id=" + getId() +
            ", socialMediaSourcesChecked='" + getSocialMediaSourcesChecked() + "'" +
            ", socialMediaFindings='" + getSocialMediaFindings() + "'" +
            ", socialMediaVerifiedDate='" + getSocialMediaVerifiedDate() + "'" +
            "}";
    }
}
